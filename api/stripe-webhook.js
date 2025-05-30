import { buffer } from 'micro';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    const buf = await buffer(req);
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('❌ Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 🎯 Handle payment completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log('✅ Payment received from', session.customer_email);

      // Example: Call Supabase or another DB to log payment
      // await supabase.from('notifications').insert({ message: `Payment from ${session.customer_email}` });

      // OR: Call Telegram/Slack webhook
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
