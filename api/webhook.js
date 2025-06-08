// /api/webhook.js

import { Readable } from 'stream';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Disable body parsing — needed for raw payload verification
export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Read raw stream
async function getRawBody(stream) {
  const chunks = [];
  for await (const chunk of stream) {
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
    console.log('✅ Stripe event verified:', event.type);
  } catch (err) {
    console.error('❌ Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};

    const user_id = metadata.user_id;
    const product_id = metadata.product_id;
    const product_type = metadata.product_type;
    const session_id = session.id;

    if (!user_id || !product_id || !product_type) {
      console.error('❌ Missing metadata:', { user_id, product_id, product_type });
      return res.status(400).send('Missing metadata.');
    }

    try {
      // Update checkout_sessions status
      await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', session_id);

      // Insert into purchases
      await supabase
        .from('purchases')
        .insert([{ user_id, product_id, product_type, session_id }]);

      console.log('✅ Purchase recorded for:', product_id);
      return res.status(200).send('Success');
    } catch (error) {
      console.error('❌ Supabase DB error:', error.message);
      return res.status(500).send('Database error');
    }
  }

  return res.status(200).send('Unhandled event');
}
