// /api/stripe-webhook.js

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Stripe signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, product_id, product_type } = session.metadata || {};

    console.log("✅ Webhook received session:", session.id);
    console.log("🔍 Metadata:", { user_id, product_id, product_type });

    if (!user_id || !product_id || !product_type) {
      console.warn("⚠️ Missing required metadata in session:", session.metadata);
      return res.status(400).json({ error: "Missing metadata" });
    }

    try {
      // Insert purchase
      const { data: existingPurchase, error: fetchError } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .eq('product_type', product_type)
        .maybeSingle();

      if (!existingPurchase) {
        const { error: insertError } = await supabase.from('purchases').insert([
          { user_id, product_id, product_type, created_at: new Date().toISOString() },
        ]);

        if (insertError) {
          console.error("❌ Failed to insert purchase:", insertError.message);
          return res.status(500).json({ error: insertError.message });
        }

        console.log("✅ Purchase recorded for:", user_id, product_id);
      } else {
        console.log("ℹ️ Purchase already exists");
      }

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error("❌ Unexpected error:", err.message);
      return res.status(500).json({ error: "Unexpected error" });
    }
  }

  return res.status(200).json({ received: true });
}
