// pages/api/generate-image-openai.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // not anon key, use service role on server
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, audience, imageStyle } = req.body;
  const prompt = `Create a ${imageStyle} style image for "${topic}" targeting "${audience}".`;

  try {
    // Step 1: Generate image via OpenAI
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

    const openaiData = await openaiRes.json();
    const imageUrl = openaiData?.data?.[0]?.url;

    if (!imageUrl) return res.status(500).json({ error: 'Failed to generate image' });

    // Step 2: Download the image blob
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const fileName = `social-images/generated-${Date.now()}.png`;

    // Step 3: Upload to Supabase
    const { error: uploadError } = await supabase
      .storage
      .from('code-canverse-bucket')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (uploadError) {
      console.error('[Upload error]', uploadError);
      return res.status(500).json({ error: 'Failed to upload to Supabase' });
    }

    // Step 4: Get public URL
    const { data: publicUrlData } = await supabase
      .storage
      .from('code-canverse-bucket')
      .getPublicUrl(fileName);

    return res.status(200).json({ imageUrl: publicUrlData.publicUrl });
  } catch (err) {
    console.error('[OpenAI Handler Error]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
