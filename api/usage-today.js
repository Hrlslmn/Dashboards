import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const { count, error } = await supabase
    .from('image_generation_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', `${today}T00:00:00.000Z`)
    .lte('created_at', `${today}T23:59:59.999Z`);

  if (error) {
    console.error('[Supabase Count Error]', error);
    return res.status(500).json({ count: 0 });
  }

  return res.status(200).json({ count });
}
