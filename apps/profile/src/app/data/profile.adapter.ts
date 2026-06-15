import { Injectable } from '@angular/core';
import { Order, Transaction, User } from 'shared-models';

/** Адаптер маппит сырой ответ API в доменные модели */
@Injectable()
export class ProfileAdapter {
  public toUser(raw: User | undefined): User | null {
    if (!raw) return null;
    const { password: _, ...user } = raw;
    return user as User;
  }

  public toTransaction(raw: Transaction): Transaction {
    return {
      id: raw.id,
      userId: raw.userId,
      amount: Number(raw.amount),
      type: raw.type,
      description: raw.description,
      createdAt: raw.createdAt,
    };
  }

  public toTransactions(raw: Transaction[]): Transaction[] {
    return raw.map((t) => this.toTransaction(t));
  }

  public toOrder(raw: Order): Order {
    return {
      id: raw.id,
      userId: raw.userId,
      productId: raw.productId,
      quantity: Number(raw.quantity),
      totalPrice: Number(raw.totalPrice),
      status: raw.status,
      createdAt: raw.createdAt,
    };
  }

  public toOrders(raw: Order[]): Order[] {
    return raw.map((o) => this.toOrder(o));
  }
}
