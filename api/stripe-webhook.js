// /pages/api/stripe-webhook.js

import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false, // Required to receive raw body from Stripe
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Stripe webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, product_id, product_type } = session.metadata || {};

    if (!user_id || !product_id || !product_type) {
      console.warn("⚠️ Missing metadata in session:", session.id);
      return res.status(400).json({ error: "Missing metadata" });
    }

    try {
      // Update the checkout session as completed
      await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session.id);

      // Check for duplicate
      const { data: existing } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .eq('product_type', product_type)
        .single();

      if (!existing) {
        await supabase.from('purchases').insert([
          { user_id, product_id, product_type },
        ]);
      }

      return res.status(200).json({ received: true });
    } catch (error) {
      console.error('❌ Supabase error:', error.message);
      return res.status(500).json({ error: 'Failed to record purchase' });
    }
  }

  return res.status(200).json({ received: true });
}
