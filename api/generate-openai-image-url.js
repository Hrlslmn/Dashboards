export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, audience, imageStyle } = req.body;

  if (!topic || !audience || !imageStyle) {
    return res.status(400).json({ error: 'Missing required fields: topic, audience, or imageStyle' });
  }

  const prompt = `Create a ${imageStyle} style image for "${topic}" targeting "${audience}".`;

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

    const json = await openaiRes.json();
    if (!json?.data?.[0]?.url) {
      console.error('[OpenAI API Error]', json);
      return res.status(400).json({ error: 'Failed to generate image' });
    }

    const imageUrl = json.data[0].url;
    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('[OpenAI Error]', err);
    return res.status(500).json({ error: 'Server error contacting OpenAI' });
  }
}
