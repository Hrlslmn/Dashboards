// File: /api/upload-to-supabase.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL, // safe to use in Vercel functions
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl in request body' });
  }

  try {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image from OpenAI URL');
    }

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
      return res.status(500).json({ error: 'Failed to upload to Supabase' });
    }

    const { data: publicUrlData } = await supabase.storage
      .from('code-canverse-bucket')
      .getPublicUrl(fileName);

    return res.status(200).json({ publicUrl: publicUrlData.publicUrl });
  } catch (err) {
    console.error('[Supabase Upload Failed]', err);
    return res.status(500).json({ error: 'Supabase upload failed' });
  }
}
