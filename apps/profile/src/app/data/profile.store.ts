import { computed, Injectable, signal } from '@angular/core';
import { Order, Transaction, User } from 'shared-models';

@Injectable()
export class ProfileStore {
  private readonly _user = signal<User | null>(null);
  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _orders = signal<Order[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  public readonly user = this._user.asReadonly();
  public readonly transactions = this._transactions.asReadonly();
  public readonly orders = this._orders.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  /** Сумма всех начислений */
  public readonly totalEarned = computed(() =>
    this._transactions()
      .filter((t) => t.type === 'earn')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  /** Сумма всех списаний */
  public readonly totalSpent = computed(() =>
    this._transactions()
      .filter((t) => t.type === 'spend')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  /** Общее количество заказов */
  public readonly ordersCount = computed(() => this._orders().length);

  public setUser(user: User | null): void {
    this._user.set(user);
  }

  public setTransactions(list: Transaction[]): void {
    this._transactions.set(list);
  }

  public setOrders(list: Order[]): void {
    this._orders.set(list);
  }

  public setLoading(val: boolean): void {
    this._loading.set(val);
  }

  public setError(msg: string | null): void {
    this._error.set(msg);
  }
}
