// pages/api/stripe-webhook.js

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
    console.error('❌ Stripe webhook signature error:', err);
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
      // Update session status
      await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session.id);

      // Check if purchase already exists (prevent duplicates)
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .eq('product_type', product_type)
        .maybeSingle();

      if (!existingPurchase) {
        await supabase.from('purchases').insert([
          {
            user_id,
            product_id,
            product_type,
          },
        ]);
        console.log(`✅ Purchase recorded for user ${user_id} - product ${product_id}`);
      } else {
        console.log(`ℹ️ Purchase already exists for user ${user_id} - product ${product_id}`);
      }

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error('❌ Supabase error during insert/update:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
  }

  res.status(200).json({ received: true });
}
