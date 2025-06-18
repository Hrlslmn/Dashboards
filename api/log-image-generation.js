// /api/log-image-generation.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing user ID' });

  const { error } = await supabase
    .from('image_generation_logs')
    .insert([{ user_id: userId }]);

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ success: true });
}
