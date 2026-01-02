import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';

registerLocaleData(localeEsCl);

import { routes } from './app.routes';
import { provideSupabase } from './core/integrations/supabase.client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { merakiInterceptor } from './core/interceptors/meraki.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideSupabase(),
    provideHttpClient(withInterceptors([merakiInterceptor])),
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ],
};
