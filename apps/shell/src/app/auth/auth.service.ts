import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, JwtPayload, UserRole } from './auth.model';

const TOKEN_KEY = 'openway_token';

const MOCK_USERS: Record<string, { password: string; role: UserRole; sub: string }> = {
  'admin@openway.ru': { password: 'admin123', role: 'admin', sub: 'admin-001' },
  'employee@openway.ru': { password: 'emp123', role: 'employee', sub: 'emp-001' },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly user = computed<AuthUser | null>(() => this.decodeToken(this._token()));
  readonly isAuthenticated = computed(() => this.user() !== null);
  readonly role = computed(() => this.user()?.role ?? null);
  readonly isAdmin = computed(() => this.role() === 'admin');

  login(credentials: { email: string; password: string }): boolean {
    const token = this.generateMockToken(credentials);
    if (!token) return false;

    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
    return true;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
    this.router.navigate(['/login']);
  }

  hasRole(role: UserRole): boolean {
    return this.role() === role;
  }

  private decodeToken(token: string | null): AuthUser | null {
    if (!token) return null;
    try {
      const raw = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = raw + '='.repeat((4 - (raw.length % 4)) % 4);
      const payload = JSON.parse(atob(padded)) as JwtPayload;
      if (payload.exp * 1000 < Date.now()) return null;
      return { sub: payload.sub, email: payload.email, role: payload.role };
    } catch {
      return null;
    }
  }

  private generateMockToken(credentials: { email: string; password: string }): string | null {
    const user = MOCK_USERS[credentials.email];
    if (!user || user.password !== credentials.password) return null;

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: user.sub,
        email: credentials.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 28800, // 8 hours
      }),
    );
    const signature = btoa('openway-mock-sig');

    return `${header}.${payload}.${signature}`;
  }
}
