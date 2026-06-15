import { UserRole } from './auth.model';

export const TOKEN_KEY = 'openway_token';

/** Тестовые пользователи — заменить на вызов API при подключении бэкенда */
export const MOCK_USERS: Record<string, { password: string; role: UserRole; sub: string }> = {
  'admin@openway.ru': { password: 'admin123', role: 'admin', sub: 'admin-001' },
  'employee@openway.ru': { password: 'emp123', role: 'employee', sub: 'emp-001' },
};
