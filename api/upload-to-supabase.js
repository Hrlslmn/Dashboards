import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imageUrl, userId } = req.body;
  if (!imageUrl || !userId) return res.status(400).json({ error: 'Missing imageUrl or userId' });

  try {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error('Failed to fetch image from URL');

    const buffer = await imageResponse.arrayBuffer();
    const fileName = `social-images/openai-${Date.now()}.png`;

    const { error: uploadError } = await supabase.storage
      .from('code-canverse-bucket')
      .upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (uploadError) {
      console.error('[Upload error]', uploadError);
      return res.status(500).json({ error: 'Upload to Supabase failed' });
    }

    const { data: publicUrlData } = await supabase.storage
      .from('code-canverse-bucket')
      .getPublicUrl(fileName);

    // Log image generation usage
    await supabase
      .from('image_generation_logs')
      .insert([{ user_id: userId, image_url: publicUrlData.publicUrl }], { returning: 'minimal' });

    return res.status(200).json({ publicUrl: publicUrlData.publicUrl });
  } catch (err) {
    console.error('[Upload error]', err);
    return res.status(500).json({ error: 'Supabase upload failed' });
  }
}
