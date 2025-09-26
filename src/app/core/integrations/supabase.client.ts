import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://TU-PROJECT-ID.supabase.co';
const supabaseAnonKey = 'TU-ANON-KEY'; // desde la dashboard de Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
