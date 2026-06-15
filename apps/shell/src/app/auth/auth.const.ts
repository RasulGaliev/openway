import { UserRole } from './auth.model';

export const TOKEN_KEY = 'openway_token';

/** Тестовые пользователи — должны совпадать с id и email в db.json */
export const MOCK_USERS: Record<string, { password: string; role: UserRole; sub: string }> = {
  'rasul@company.com': { password: '123456', role: 'employee', sub: '1' },
  'admin@company.com': { password: 'admin123', role: 'admin', sub: '2' },
};
