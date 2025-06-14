export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, audience } = req.body;

  const BANNERBEAR_API_KEY = process.env.BANNERBEAR_API_KEY;
  const TEMPLATE_UID = 'Aqa9wzDP2oRBZJogk7'; // Replace with your actual UID

  try {
    const response = await fetch('https://api.bannerbear.com/v2/images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BANNERBEAR_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: TEMPLATE_UID,
        modifications: [
          { name: 'title', text: topic },
          { name: 'subtitle', text: audience },
        ],
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless Bannerbear Error:', error);
    return res.status(500).json({ error: 'Failed to contact Bannerbear' });
  }
}
