// /api/webhook.js

import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
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
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Only run this on checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, product_id, product_type } = session.metadata;

    if (!user_id || !product_id || !product_type) {
      return res.status(400).json({ error: 'Missing metadata' });
    }

    // ✅ FIX: Await is now inside the async handler function
    const { error: insertError } = await supabase
      .from('purchases')
      .insert([
        {
          user_id,
          product_id,
          product_type,
          session_id: session.id, // ✅ Ensure session_id is included
        },
      ]);

    if (insertError) {
      console.error('❌ Supabase insert failed:', insertError.message);
      return res.status(500).json({ error: insertError.message });
    }

    await supabase
      .from('checkout_sessions')
      .update({ status: 'completed' })
      .eq('session_id', session.id);

    return res.status(200).json({ received: true });
  }

  return res.status(200).json({ received: true });
}
