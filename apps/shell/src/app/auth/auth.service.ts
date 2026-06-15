import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_USERS, TOKEN_KEY } from './auth.const';
import { AuthUser, JwtPayload, UserRole } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  /** Токен в сигнале — изменение автоматически обновляет все вычисляемые свойства */
  private readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  /** Декодированные данные текущего пользователя, null если не авторизован или токен истёк */
  public readonly user = computed<AuthUser | null>(() => this.decodeToken(this.token()));

  /** true если пользователь авторизован и токен не истёк */
  public readonly isAuthenticated = computed(() => this.user() !== null);

  /** Роль текущего пользователя, null если не авторизован */
  public readonly role = computed(() => this.user()?.role ?? null);

  /** Сокращение для проверки роли администратора */
  public readonly isAdmin = computed(() => this.role() === 'admin');

  /**
   * Выполняет вход: генерирует JWT и сохраняет в localStorage.
   * @returns true при успехе, false если учётные данные неверны
   */
  public login(credentials: { email: string; password: string }): boolean {
    const token = this.generateMockToken(credentials);
    if (!token) return false;

    localStorage.setItem(TOKEN_KEY, token);
    this.token.set(token);
    return true;
  }

  /** Выполняет выход: удаляет токен и перенаправляет на страницу входа */
  public logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Проверяет соответствие роли текущего пользователя.
   * @param role роль для проверки
   */
  public hasRole(role: UserRole): boolean {
    return this.role() === role;
  }

  /**
   * Декодирует JWT и возвращает данные пользователя.
   * Возвращает null если токен отсутствует, повреждён или истёк.
   */
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

  /**
   * Генерирует мок JWT токен для тестовых пользователей.
   * В production заменить на HTTP запрос к эндпоинту авторизации.
   */
  private generateMockToken(credentials: { email: string; password: string }): string | null {
    const user = MOCK_USERS[credentials.email];
    if (!user || user.password !== credentials.password) return null;

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: user.sub,
        email: credentials.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 28800,
      }),
    );
    const signature = btoa('openway-mock-sig');

    return `${header}.${payload}.${signature}`;
  }
}
