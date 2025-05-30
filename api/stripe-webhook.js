import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Supabase with service role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const rawBody = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.user_id;

    if (!userId) {
      console.error('❌ No user_id found in metadata');
      return res.status(400).send('Missing user_id in metadata');
    }

    const { error: orderError } = await supabase.from('orders').insert({
      user_id: userId,
      amount: session.amount_total,
      status: 'paid',
      payment_intent: session.payment_intent,
    });

    if (orderError) {
      console.error('❌ Failed to insert order:', orderError);
    }

    const { error: notifError } = await supabase.from('notifications').insert({
      user_id: userId,
      message: 'Your payment was successful!',
      type: 'payment',
    });

    if (notifError) {
      console.error('❌ Failed to insert notification:', notifError);
    }
  }

  res.status(200).send('✅ Webhook received');
}



