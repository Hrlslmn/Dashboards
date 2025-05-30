import { buffer } from 'micro';
import Stripe from 'stripe';
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
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

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
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.metadata?.user_id;
    const amount = session.amount_total;
    const paymentIntent = session.payment_intent;

    if (userId) {
      // Store order
      await supabase.from('orders').insert({
        user_id: userId,
        amount,
        status: 'paid',
        payment_intent: paymentIntent,
      });

      // Send notification
      await supabase.from('notifications').insert({
        user_id: userId,
        message: 'Your payment was successful!',
        type: 'payment',
      });

      // Optional: Email notification logic (e.g., using Resend)
    }
  }

  res.status(200).end();
}



