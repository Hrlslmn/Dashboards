export default async function handler(req, res) {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: 'Missing UID' });
  }

  const BANNERBEAR_API_KEY = process.env.BANNERBEAR_API_KEY;

  try {
    const statusRes = await fetch(`https://api.bannerbear.com/v2/images/${uid}`, {
      headers: {
        Authorization: `Bearer ${BANNERBEAR_API_KEY}`,
      },
    });

    const statusData = await statusRes.json();
    return res.status(200).json(statusData);
  } catch (error) {
    console.error("Status check error:", error);
    return res.status(500).json({ error: 'Failed to check image status' });
  }
}
