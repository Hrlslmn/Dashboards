// /api/webhook.js

import Stripe from 'stripe';
import { Readable } from 'stream';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const buf = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("✅ Stripe event verified:", event.type);
  } catch (err) {
    console.error("❌ Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log("📦 Stripe Session Object:", session);

    const user_id = session.metadata?.user_id;
    const product_id = session.metadata?.product_id;
    const product_type = session.metadata?.product_type;
    const session_id = session.id;

    if (!user_id || !product_id || !product_type) {
      console.error("❌ Missing metadata:", { user_id, product_id, product_type });
      return res.status(400).send('Missing metadata values.');
    }

    try {
      const { error: updateError } = await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session_id);

      if (updateError) {
        console.error('❌ Failed to update session:', updateError.message);
        return res.status(500).send('Failed to update checkout session');
      }

      const { error: insertError } = await supabase
        .from('purchases')
        .insert([{ user_id, product_id, product_type, session_id }]);

      if (insertError) {
        console.error('❌ Failed to insert purchase:', insertError.message);
        return res.status(500).send('Failed to insert into purchases');
      }

      console.log("✅ Purchase recorded for", product_id);
      return res.status(200).send('Success');
    } catch (err) {
      console.error("❌ Server error:", err.message);
      return res.status(500).send('A server error has occurred');
    }
  }

  return res.status(200).send('Unhandled event');
}
