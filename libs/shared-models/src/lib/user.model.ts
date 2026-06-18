export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  position: string;
  coins: number;
  xp: number;
  avatar?: string;
}
