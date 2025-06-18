import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, audience, imageStyle, userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  // --- Step 1: Check today's generation count ---
  const { count, error: countError } = await supabase
    .from('generations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString());

  if (countError) {
    console.error('[Count Error]', countError);
    return res.status(500).json({ error: 'Failed to check daily usage' });
  }

  if (count >= 10) {
    return res.status(429).json({ error: 'Daily limit reached. Please try again tomorrow.' });
  }

  const prompt = `A realistic ${imageStyle} style image of "${topic}" targeting "${audience}", no text, no words, no writing, no labels`;

  // --- Step 2: Generate image ---
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'url',
      }),
    });

    const text = await openaiRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: 'Invalid JSON from OpenAI' });
    }

    const imageUrl = data?.data?.[0]?.url;
    if (!imageUrl) return res.status(500).json({ error: 'No image URL returned from OpenAI' });

    // --- Step 3: Log generation ---
    const { error: insertError } = await supabase
      .from('generations')
      .insert({ user_id: userId });

    if (insertError) {
      console.error('[Insert Error]', insertError);
    }

    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('[OpenAI Error]', err);
    return res.status(500).json({ error: 'Server error contacting OpenAI' });
  }
}
