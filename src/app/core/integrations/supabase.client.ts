import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

const { url, anonKey } = environment.supabaseConfig;

export const supabase = createClient(url, anonKey);
