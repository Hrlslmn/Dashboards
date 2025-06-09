if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const { user_id, product_id, product_type } = session.metadata;

  if (!user_id || !product_id || !product_type) {
    return res.status(400).json({ error: 'Missing metadata' });
  }

  const { error: insertError } = await supabase
    .from('purchases')
    .insert([
      {
        user_id,
        product_id,
        product_type,
        session_id: session.id, // ✅ Fix: Include session_id here
      },
    ]);

  if (insertError) {
    console.error('❌ Supabase insert failed:', insertError.message);
    return res.status(500).json({ error: insertError.message });
  }

  await supabase
    .from('checkout_sessions')
    .update({ status: 'completed' })
    .eq('session_id', session.id);

  return res.status(200).json({ received: true });
}
