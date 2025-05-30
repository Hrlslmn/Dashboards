import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature'];
  const rawBody = await buffer(req);
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Send email
    await resend.emails.send({
    from: 'FourthDivision <noreply@yourdomain.com>',
    to: session.customer_details.email, // ✅ gets the customer's email
    subject: 'Order Confirmation',
    html: `<p>Hi ${session.customer_details.name},</p>
            <p>Your payment of $${(session.amount_total / 100).toFixed(2)} was successful!</p>
            <p>Thanks for your purchase from Fourth Division.We hope you enjoy your purchase.</p>`,
    });


    // Store order
    await supabase.from('orders').insert({
      user_id: session.metadata.user_id,
      amount: session.amount_total,
      status: 'paid',
      payment_intent: session.payment_intent,
    });

    // Send notification
    await supabase.from('notifications').insert({
      user_id: session.metadata.user_id,
      message: 'Your payment was successful!',
      type: 'payment',
    });

    // Send email via Resend or another service
  }

  res.status(200).end();
}


