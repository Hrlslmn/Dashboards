// File: /api/generate-openai-image-url.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, audience, imageStyle, prompt: customPrompt } = req.body;

  const prompt = customPrompt || `Create a ${imageStyle} style image for "${topic}" targeting "${audience}".`;

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
    console.log('[OpenAI Raw Response]', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: 'Invalid JSON from OpenAI' });
    }

    const imageUrl = data?.data?.[0]?.url;
    if (!imageUrl) return res.status(500).json({ error: 'No image URL returned from OpenAI' });

    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('[OpenAI Error]', err);
    return res.status(500).json({ error: 'Server error contacting OpenAI' });
  }
}
