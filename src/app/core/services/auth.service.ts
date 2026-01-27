import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { AuthData } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private _authData = signal<AuthData | null>(this.getAuthFromStorage());

  public currentUser = this._authData.asReadonly();
  public isAuthenticated = computed(() => !!this._authData());

  public login(
    email: string,
    password: string,
  ): Observable<ApiResponse<AuthData>> {
    const url = `${environment.merakiUrl}/auth/login`;
    return this.http.post<ApiResponse<AuthData>>(url, { email, password }).pipe(
      tap((response) => {
        const authData = response.data;
        this.saveToStorage(authData);
        this._authData.set(authData);
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-active');
    this._authData.set(null);
  }

  private saveToStorage(data: AuthData): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user-active', JSON.stringify(data));
  }

  private getAuthFromStorage(): AuthData | null {
    const data = localStorage.getItem('user-active');
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing auth data from storage', error);
      return null;
    }
  }
}
