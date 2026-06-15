export type { UserRole } from 'shared-models';
import type { UserRole } from 'shared-models';

/** Содержимое JWT токена после декодирования */
export interface JwtPayload {
  /** Идентификатор пользователя */
  sub: string;
  email: string;
  role: UserRole;
  /** Время истечения токена в секундах (Unix timestamp) */
  exp: number;
}

/** Данные авторизованного пользователя, доступные через AuthService */
export interface AuthUser {
  sub: string;
  email: string;
  role: UserRole;
}
