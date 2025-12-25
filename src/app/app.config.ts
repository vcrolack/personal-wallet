import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideSupabase } from './core/integrations/supabase.client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { merakiInterceptor } from './core/interceptors/meraki.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideSupabase(),
    provideHttpClient(withInterceptors([merakiInterceptor])),
  ],
};
