import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { InjectionToken, Provider } from '@angular/core';

export const SUPABASE = new InjectionToken<SupabaseClient>('SUPABASE');

const { url, anonKey } = environment.supabaseConfig;

export const provideSupabase = (): Provider => ({
  provide: SUPABASE,
  useFactory: () => createClient(url, anonKey),
});
