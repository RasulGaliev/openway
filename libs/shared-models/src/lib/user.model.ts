export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  /** Не возвращать на фронтенд — только для mock бэкенда */
  password?: string;
  role: UserRole;
  balance: number;
}
