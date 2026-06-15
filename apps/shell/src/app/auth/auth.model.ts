export type { UserRole } from 'shared-models';
import type { UserRole } from 'shared-models';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  exp: number;
}

export interface AuthUser {
  sub: string;
  email: string;
  role: UserRole;
}
