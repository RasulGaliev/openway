/** Тип активности — справочник */
export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  coinsReward: number;
  xpReward: number;
}

/** Факт участия пользователя в активности */
export interface UserActivity {
  id: string;
  userId: string;
  activityId: string;
  status: 'pending' | 'approved' | 'rejected';
  comment: string;
  createdAt: string;
}
