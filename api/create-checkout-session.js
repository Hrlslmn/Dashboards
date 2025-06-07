// pages/api/create-checkout-session.js

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, price, productId, productType, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'Missing user ID' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        user_id,
        product_id: productId,
        product_type: productType,
      },
    });

    await supabase.from('checkout_sessions').insert([
      {
        user_id,
        session_id: session.id,
        status: 'pending',
        product_id: productId,
        product_type: productType,
      },
    ]);

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
