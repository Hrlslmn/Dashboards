// pages/api/webhook.js

import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false, // 🔥 VERY IMPORTANT
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Verified event:', event.type);
  } catch (err) {
    console.error('❌ Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, product_id, product_type } = session.metadata || {};

    try {
      if (!user_id || !product_id || !product_type) {
        throw new Error('Missing Stripe metadata');
      }

      // ✅ Update checkout_sessions status
      await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session.id);

      // ✅ Add to purchases
      await supabase
        .from('purchases')
        .insert([{ user_id, product_id, product_type, session_id: session.id }]);

      console.log('✅ Purchase recorded in Supabase');
    } catch (error) {
      console.error('❌ Supabase insert error:', error.message);
      return res.status(500).send('Internal Supabase Error');
    }
  }

  res.status(200).send('OK');
}
