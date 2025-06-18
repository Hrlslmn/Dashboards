// pages/api/generate-image-openai.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, audience, imageStyle } = req.body;
  const prompt = `Create a ${imageStyle} image for "${topic}" targeting "${audience}".`;

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

    if (!data?.data?.[0]?.url) return res.status(500).json({ error: 'No image returned' });

    return res.status(200).json({ imageUrl: data.data[0].url });
  } catch (err) {
    console.error('OpenAI error:', err);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
}
