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

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const { user_id, product_id, product_type } = session.metadata;

    if (!user_id || !product_id) {
      console.error('Missing metadata for purchase.');
      return res.status(400).send('Missing metadata');
    }

    // ✅ Insert into purchases table
    const { error: insertError } = await supabase.from('purchases').insert([
      {
        user_id,
        product_id,
        product_type,
        session_id: session.id,
      },
    ]);

    if (insertError) {
      console.error('❌ Failed to insert purchase:', insertError.message);
      return res.status(500).send('Failed to record purchase');
    }

    console.log('✅ Purchase recorded successfully');
    return res.status(200).send('Purchase recorded');
  }

  res.status(200).send('Event received');
}
