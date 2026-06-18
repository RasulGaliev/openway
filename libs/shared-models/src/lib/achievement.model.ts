/** Тип достижения — справочник, тянется с бэка */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  coinsReward: number;
  xpReward: number;
}

/** Полученное/запрошенное пользователем достижение */
export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  status: 'pending' | 'approved' | 'rejected';
  comment: string;
  createdAt: string;
}
