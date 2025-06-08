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

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userId = session.metadata.user_id;
    const productId = session.metadata.product_id;
    const productType = session.metadata.product_type;
    const sessionId = session.id;

    try {
      // ✅ Update checkout session to completed
      const { error: updateError } = await supabase
        .from('checkout_sessions')
        .update({ status: 'completed' })
        .eq('session_id', sessionId);

      if (updateError) {
        console.error('❌ Failed to update session status:', updateError.message);
        return res.status(500).send('Failed to update session status');
      }

      // ✅ Prevent duplicate purchase entry
      const { data: existing, error: existingError } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .eq('product_type', productType)
        .maybeSingle();

      if (!existing && !existingError) {
        // ✅ Insert new purchase record
        const { error: insertError } = await supabase
          .from('purchases')
          .insert([
            {
              user_id: userId,
              product_id: productId,
              product_type: productType,
              session_id: sessionId,
            },
          ]);

        if (insertError) {
          console.error('❌ Failed to insert purchase:', insertError.message);
          return res.status(500).send('Purchase insert error');
        }
      }

      return res.status(200).send('✅ Purchase recorded successfully');
    } catch (err) {
      console.error('❌ Server error:', err.message);
      return res.status(500).send('Server Error');
    }
  }

  return res.status(200).send('✅ Event received');
}
