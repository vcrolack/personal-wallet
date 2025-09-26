import { inject, Injectable } from '@angular/core';
import { SUPABASE } from '../integrations/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client = inject(SUPABASE);

  public getSession() {
    return this.client.auth.getSession();
  }

  public signIn(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  public signOut() {
    return this.client.auth.signOut();
  }
}
