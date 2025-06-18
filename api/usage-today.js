// /api/usage-today.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const userId = req.headers['x-user-id']; // Or get from session
  if (!userId) return res.status(400).json({ error: 'Missing user ID' });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // midnight today

  const { count, error } = await supabase
    .from('image_generation_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', today.toISOString());

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ count });
}
