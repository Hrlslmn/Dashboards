// 1. /api/generate-openai-image-url.js
import { config } from 'dotenv';
config();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;

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

    const data = await openaiRes.json();
    const imageUrl = data?.data?.[0]?.url;

    if (!imageUrl) return res.status(500).json({ error: 'Failed to get image URL' });

    return res.status(200).json({ imageUrl });
  } catch (err) {
    return res.status(500).json({ error: 'OpenAI generation failed' });
  }
}
