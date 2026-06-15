export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  /** Не возвращать на фронтенд — только для mock бэкенда */
  password?: string;
  role: UserRole;
  balance: number;
  /** Base64 или URL аватара, отсутствует если не загружен */
  avatar?: string;
}
