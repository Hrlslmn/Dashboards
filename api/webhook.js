// /api/webhook.js

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro'; // ✅ micro is required!

export const config = {
  api: {
    bodyParser: false, // ✅ Must disable body parser
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

  let event;
  try {
    const buf = await buffer(req); // ✅ get raw body
    const sig = req.headers['stripe-signature'];

    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Webhook verified:', event.type);
  } catch (err) {
    console.error('❌ Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};

    const user_id = metadata.user_id;
    const product_id = metadata.product_id;
    const product_type = metadata.product_type;
    const session_id = session.id;

    try {
      if (!user_id || !product_id || !product_type) {
        throw new Error('Missing metadata fields');
      }

      // ✅ Update checkout_sessions
      await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session_id);

      // ✅ Insert purchase
      await supabase
        .from('purchases')
        .insert([{ user_id, product_id, product_type, session_id }]);

      console.log('✅ Purchase saved for:', product_id);
      return res.status(200).send('Success');
    } catch (err) {
      console.error('❌ Supabase error:', err.message);
      return res.status(500).send('Internal Server Error');
    }
  }

  res.status(200).send('Event received');
}
