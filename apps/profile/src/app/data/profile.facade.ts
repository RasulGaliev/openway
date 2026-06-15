import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Order, Transaction, User } from 'shared-models';
import { ProfileAdapter } from './profile.adapter';
import { ProfileStore } from './profile.store';

const API_URL = 'http://localhost:3000';

/**
 * Читает userId из JWT в localStorage, чтобы не зависеть от UserService shell-а напрямую.
 * Получение пользователя через шину событий — shell эмитит USER_LOGGED_IN,
 * но для начальной загрузки достаточно sub из токена.
 */
function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('openway_token');
  if (!token) return null;
  try {
    const raw = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = raw + '='.repeat((4 - (raw.length % 4)) % 4);
    return JSON.parse(atob(padded))?.sub ?? null;
  } catch {
    return null;
  }
}

@Injectable()
export class ProfileFacade {
  private readonly http = inject(HttpClient);
  private readonly store = inject(ProfileStore);
  private readonly adapter = inject(ProfileAdapter);

  public readonly user = this.store.user;
  public readonly transactions = this.store.transactions;
  public readonly orders = this.store.orders;
  public readonly loading = this.store.loading;
  public readonly error = this.store.error;
  public readonly totalEarned = this.store.totalEarned;
  public readonly totalSpent = this.store.totalSpent;
  public readonly ordersCount = this.store.ordersCount;

  /**
   * Загружает профиль, транзакции и заказы по userId из токена.
   * Все три запроса выполняются параллельно через forkJoin.
   */
  public init(): void {
    const userId = getUserIdFromToken();
    if (!userId) {
      this.store.setError('Токен не найден. Войдите в систему заново.');
      return;
    }

    this.store.setLoading(true);
    this.store.setError(null);

    forkJoin({
      user: this.http.get<User>(`${API_URL}/users/${userId}`),
      transactions: this.http.get<Transaction[]>(`${API_URL}/transactions`, { params: { userId } }),
      orders: this.http.get<Order[]>(`${API_URL}/orders`, { params: { userId } }),
    })
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: ({ user, transactions, orders }) => {
          const mapped = this.adapter.toUser(user);
          if (!mapped) {
            this.store.setError(`Пользователь с id="${userId}" не найден в базе. Выйдите и войдите заново.`);
            return;
          }
          this.store.setUser(mapped);
          this.store.setTransactions(this.adapter.toTransactions(transactions));
          this.store.setOrders(this.adapter.toOrders(orders));
        },
        error: () => {
          this.store.setError('Не удалось загрузить данные. Проверьте что json-server запущен: pnpm api');
        },
      });
  }

  /**
   * Обновляет поля профиля через PATCH /users/:id.
   * Принимает частичный объект — можно обновлять имя и аватар независимо.
   */
  public updateUser(patch: Partial<User>): void {
    const userId = getUserIdFromToken();
    if (!userId) return;

    this.http.patch<User>(`${API_URL}/users/${userId}`, patch).subscribe((updated) => {
      this.store.setUser(this.adapter.toUser(updated) ?? this.store.user());
    });
  }
}
