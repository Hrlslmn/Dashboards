export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Missing image URL' });

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');

    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    console.error('Image proxy error:', err);
    res.status(500).json({ error: 'Image download failed' });
  }
}
