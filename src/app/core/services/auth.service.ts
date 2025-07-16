import { computed, Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, map } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.interface';
import { environment } from '../../../environments/environment';
import { Utilities } from '../utils/utilities';
import { plainToInstance } from 'class-transformer';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/token.interface';
import { AuthStore } from '../store/auth/auth.store';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = signal<User | null>(null);
  readonly currentUser = computed(() => this.user());
  private authStore = inject(AuthStore);

  private readonly apiUrl = `${environment.apiAuthUrl}/user-service/auth`;

  constructor(private http: HttpClient) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.user.set(user);
      this.authStore.setUser(user);
      this.authStore.setToken(localStorage.getItem('token'));
    }
  }

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => plainToInstance(AuthResponse, response)),
        tap(response => {
          const token = response.accessToken;
          const decoded = plainToInstance(JwtPayload, jwtDecode(token));
          const userFromToken: User = {
            id: decoded.sub,
            fullName: decoded.preferredUsername,
            email: decoded.email
          }
          response.user = userFromToken;

          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.user.set(userFromToken);
          this.authStore.setUser(userFromToken);
          this.authStore.setToken(response.accessToken);
          
          console.log('User logged in:', response.user);
          return response;
        })
      );
  }

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-up`, data)
      .pipe(
        tap(response => {
          const token = response.accessToken;
          const decoded = plainToInstance(JwtPayload, jwtDecode(token));
          const userFromToken: User = {
            id: decoded.sub,
            fullName: decoded.preferredUsername,
            email: decoded.email
          }
          response.user = userFromToken;

          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.user.set(response.user);
          this.authStore.setUser(response.user);
          this.authStore.setToken(response.accessToken);

          console.log('User registered:', response.user);
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.authStore.logout();
    return of(void 0);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { token, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    // TODO: Replace with actual API call
    return of(null);
  }

  setTheme(theme: 'light' | 'dark'): void {
    Utilities.setTheme(theme);
  }

  toggleTheme(): void {
    Utilities.toggleTheme();
  }

  getCurrentTheme(): string {
    return Utilities.getTheme();
  }
}
