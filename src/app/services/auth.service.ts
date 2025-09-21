import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'auth_token';

  private http = inject(HttpClient);

  public login(
    username: string,
    password: string,
  ): Observable<{ token: string }> {
    return this.http
      .post<{
        token: string;
      }>(`${environment.apiUrl}/get-token/`, { username, password })
      .pipe(tap((response) => this.setToken(response.token)));
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
