// /api/stripe-webhook.js

import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("✅ Stripe webhook verified");
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, product_id, product_type } = session.metadata || {};

    console.log("📦 Session metadata:", { user_id, product_id, product_type });

    if (!user_id || !product_id || !product_type) {
      console.error("❌ Missing metadata fields");
      return res.status(400).send("Missing metadata");
    }

    const { error: updateError } = await supabase
      .from('checkout_sessions')
      .update({ status: 'completed' })
      .eq('session_id', session.id);

    if (updateError) {
      console.error("❌ Failed to update checkout_sessions:", updateError.message);
    }

    const { error: insertError } = await supabase
      .from('purchases')
      .insert([{ user_id, product_id, product_type, session_id: session.id }]);

    if (insertError) {
      console.error("❌ Failed to insert purchase:", insertError.message);
      return res.status(500).send("Failed to insert purchase");
    }

    console.log("✅ Purchase recorded successfully");
    return res.status(200).send("Success");
  }

  res.status(200).send("Unhandled event");
}
