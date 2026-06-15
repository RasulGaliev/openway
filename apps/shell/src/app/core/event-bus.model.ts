/**
 * Объединение всех событий платформы Openway.
 * Каждый вариант имеет уникальный тип и строго типизированные данные.
 * При добавлении нового типа TypeScript укажет все места где он не обработан.
 */
export type AppEvent =
  /** Пользователь успешно прошёл аутентификацию */
  | { type: 'USER_LOGGED_IN'; payload: { userId: string; role: 'employee' | 'admin' } }
  /** Пользователь вышел из системы или истёк токен */
  | { type: 'USER_LOGGED_OUT' }
  /** Баланс баллов изменился после начисления или списания */
  | { type: 'BALANCE_UPDATED'; payload: { userId: string; balance: number } }
  /** Начислены баллы за активность в разделе активностей */
  | { type: 'POINTS_EARNED'; payload: { userId: string; amount: number; description: string } }
  /** Совершена покупка в магазине, баллы списаны */
  | { type: 'PRODUCT_PURCHASED'; payload: { userId: string; productId: string; amount: number } }
  /** Глобальное уведомление для отображения в оболочке */
  | { type: 'NOTIFICATION'; payload: { message: string; severity: 'info' | 'success' | 'error' } };
