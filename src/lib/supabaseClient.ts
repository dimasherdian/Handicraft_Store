import { createClient } from '@supabase/supabase-js';

// Ambil URL dan Kunci Anon dari environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Lakukan validasi untuk memastikan environment variables ada
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

// Buat dan ekspor klien Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
