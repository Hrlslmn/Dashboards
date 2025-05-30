import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false, // Required for raw body
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Read raw body from Vercel request
 */
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Stripe signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`💰 Payment received: ${session.amount_total} for ${session.customer_email}`);
    
    // Example: Insert into Supabase, send notification, etc.
  }

  res.status(200).json({ received: true });
}
