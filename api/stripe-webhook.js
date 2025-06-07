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
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.metadata.user_id;
    const productId = session.metadata.product_id;
    const productType = session.metadata.product_type;

    try {
      await supabase.from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session.id);

      await supabase.from('purchases').insert([
        {
          user_id: userId,
          product_id: productId,
          product_type: productType,
        },
      ]);

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error('Supabase insert error:', err.message);
      return res.status(500).json({ error: 'Database insert failed' });
    }
  }

  res.status(200).json({ received: true });
}
