import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, switchMap } from 'rxjs';
import { Achievement, Activity, Order, Product, User, UserAchievement, UserActivity } from 'shared-models';

const API_URL = 'http://localhost:3000';

export interface ActivityRequest extends UserActivity {
  user: User | null;
  activity: Activity | null;
}

export interface AchievementRequest extends UserAchievement {
  user: User | null;
  achievement: Achievement | null;
}

export interface OrderRequest extends Order {
  user: User | null;
  product: Product | null;
}

@Injectable()
export class AdminFacade {
  private readonly http = inject(HttpClient);

  private readonly _users = signal<User[]>([]);
  private readonly _activities = signal<Activity[]>([]);
  private readonly _achievements = signal<Achievement[]>([]);
  private readonly _userActivities = signal<UserActivity[]>([]);
  private readonly _userAchievements = signal<UserAchievement[]>([]);
  private readonly _products = signal<Product[]>([]);
  private readonly _orders = signal<Order[]>([]);
  private readonly _loading = signal(false);

  public readonly users = this._users.asReadonly();
  public readonly activities = this._activities.asReadonly();
  public readonly achievements = this._achievements.asReadonly();
  public readonly products = this._products.asReadonly();
  public readonly loading = this._loading.asReadonly();

  public init(): void {
    this._loading.set(true);
    forkJoin({
      users: this.http.get<User[]>(`${API_URL}/users`),
      activities: this.http.get<Activity[]>(`${API_URL}/activities`),
      achievements: this.http.get<Achievement[]>(`${API_URL}/achievements`),
      userActivities: this.http.get<UserActivity[]>(`${API_URL}/userActivities`),
      userAchievements: this.http.get<UserAchievement[]>(`${API_URL}/userAchievements`),
      products: this.http.get<Product[]>(`${API_URL}/products`),
      orders: this.http.get<Order[]>(`${API_URL}/orders`),
    }).subscribe((data) => {
      this._users.set(data.users);
      this._activities.set(data.activities);
      this._achievements.set(data.achievements);
      this._userActivities.set(data.userActivities);
      this._userAchievements.set(data.userAchievements);
      this._products.set(data.products);
      this._orders.set(data.orders);
      this._loading.set(false);
    });
  }

  /** Заявки на активности со статусом pending — с подтянутыми user и activity */
  public getActivityRequests(): ActivityRequest[] {
    return this._userActivities()
      .filter((ua) => ua.status === 'pending')
      .map((ua) => ({
        ...ua,
        user: this._users().find((u) => String(u.id) === String(ua.userId)) ?? null,
        activity: this._activities().find((a) => String(a.id) === String(ua.activityId)) ?? null,
      }));
  }

  public getAchievementRequests(): AchievementRequest[] {
    return this._userAchievements()
      .filter((ua) => ua.status === 'pending')
      .map((ua) => ({
        ...ua,
        user: this._users().find((u) => String(u.id) === String(ua.userId)) ?? null,
        achievement: this._achievements().find((a) => String(a.id) === String(ua.achievementId)) ?? null,
      }));
  }

  public getOrders(): OrderRequest[] {
    return this._orders().map((o) => ({
      ...o,
      user: this._users().find((u) => String(u.id) === String(o.userId)) ?? null,
      product: this._products().find((p) => String(p.id) === String(o.productId)) ?? null,
    }));
  }

  public getEmployees(): User[] {
    return this._users().filter((u) => u.role === 'employee');
  }

  /**
   * Одобряет заявку на активность.
   * Обновляет статус и начисляет coins/xp пользователю.
   */
  public approveActivity(req: ActivityRequest): void {
    if (!req.user || !req.activity) return;

    const newCoins = req.user.coins + req.activity.coinsReward;
    const newXp = req.user.xp + req.activity.xpReward;

    forkJoin([
      this.http.patch(`${API_URL}/userActivities/${req.id}`, { status: 'approved' }),
      this.http.patch(`${API_URL}/users/${req.user.id}`, { coins: newCoins, xp: newXp }),
    ]).subscribe(() => {
      this._userActivities.update((list) =>
        list.map((ua) => (ua.id === req.id ? { ...ua, status: 'approved' } : ua)),
      );
      this._users.update((list) =>
        list.map((u) => (u.id === req.user!.id ? { ...u, coins: newCoins, xp: newXp } : u)),
      );
    });
  }

  public rejectActivity(req: ActivityRequest): void {
    this.http.patch(`${API_URL}/userActivities/${req.id}`, { status: 'rejected' }).subscribe(() => {
      this._userActivities.update((list) =>
        list.map((ua) => (ua.id === req.id ? { ...ua, status: 'rejected' } : ua)),
      );
    });
  }

  public approveAchievement(req: AchievementRequest): void {
    if (!req.user || !req.achievement) return;

    const newCoins = req.user.coins + req.achievement.coinsReward;
    const newXp = req.user.xp + req.achievement.xpReward;

    forkJoin([
      this.http.patch(`${API_URL}/userAchievements/${req.id}`, { status: 'approved' }),
      this.http.patch(`${API_URL}/users/${req.user.id}`, { coins: newCoins, xp: newXp }),
    ]).subscribe(() => {
      this._userAchievements.update((list) =>
        list.map((ua) => (ua.id === req.id ? { ...ua, status: 'approved' } : ua)),
      );
      this._users.update((list) =>
        list.map((u) => (u.id === req.user!.id ? { ...u, coins: newCoins, xp: newXp } : u)),
      );
    });
  }

  public rejectAchievement(req: AchievementRequest): void {
    this.http.patch(`${API_URL}/userAchievements/${req.id}`, { status: 'rejected' }).subscribe(() => {
      this._userAchievements.update((list) =>
        list.map((ua) => (ua.id === req.id ? { ...ua, status: 'rejected' } : ua)),
      );
    });
  }

  /** Вручную выдать достижение сотруднику. Создаёт запись со status=approved и начисляет награды. */
  public grantAchievement(userId: string, achievementId: string, comment: string): void {
    const user = this._users().find((u) => String(u.id) === String(userId));
    const achievement = this._achievements().find((a) => String(a.id) === String(achievementId));
    if (!user || !achievement) return;

    const newCoins = user.coins + achievement.coinsReward;
    const newXp = user.xp + achievement.xpReward;

    const payload: Omit<UserAchievement, 'id'> = {
      userId: Number(userId) as any,
      achievementId: Number(achievementId) as any,
      status: 'approved',
      comment,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    this.http.post<UserAchievement>(`${API_URL}/userAchievements`, payload).pipe(
      switchMap((created) =>
        this.http.patch<User>(`${API_URL}/users/${userId}`, { coins: newCoins, xp: newXp })
          .pipe(switchMap(() => [created])),
      ),
    ).subscribe((created) => {
      this._userAchievements.update((list) => [...list, created]);
      this._users.update((list) =>
        list.map((u) => (u.id === user.id ? { ...u, coins: newCoins, xp: newXp } : u)),
      );
    });
  }

  // === CRUD сотрудников ===

  public createUser(payload: Omit<User, 'id'>): void {
    this.http.post<User>(`${API_URL}/users`, payload).subscribe((created) => {
      this._users.update((list) => [...list, created]);
    });
  }

  public updateUser(id: string, patch: Partial<User>): void {
    this.http.patch<User>(`${API_URL}/users/${id}`, patch).subscribe((updated) => {
      this._users.update((list) => list.map((u) => (u.id === id ? updated : u)));
    });
  }

  public deleteUser(id: string): void {
    this.http.delete(`${API_URL}/users/${id}`).subscribe(() => {
      this._users.update((list) => list.filter((u) => u.id !== id));
    });
  }

  // === CRUD товаров ===

  public createProduct(payload: Omit<Product, 'id'>): void {
    this.http.post<Product>(`${API_URL}/products`, payload).subscribe((created) => {
      this._products.update((list) => [...list, created]);
    });
  }

  public updateProduct(id: string, patch: Partial<Product>): void {
    this.http.patch<Product>(`${API_URL}/products/${id}`, patch).subscribe((updated) => {
      this._products.update((list) => list.map((p) => (p.id === id ? updated : p)));
    });
  }

  public deleteProduct(id: string): void {
    this.http.delete(`${API_URL}/products/${id}`).subscribe(() => {
      this._products.update((list) => list.filter((p) => p.id !== id));
    });
  }

  /** Меняет статус заказа: pending → ready → received */
  public updateOrderStatus(orderId: string, status: Order['status']): void {
    this.http.patch(`${API_URL}/orders/${orderId}`, { status }).subscribe(() => {
      this._orders.update((list) =>
        list.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
    });
  }
}
