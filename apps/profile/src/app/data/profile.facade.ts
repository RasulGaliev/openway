import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Achievement, Activity, User, UserActivity } from 'shared-models';
import { ProfileAdapter } from './profile.adapter';
import { ProfileStore } from './profile.store';

const API_URL = 'http://localhost:3000';

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
  public readonly userActivitiesWithDetails = this.store.userActivitiesWithDetails;
  public readonly userAchievementsWithDetails = this.store.userAchievementsWithDetails;
  public readonly activities = this.store.activities;
  public readonly achievements = this.store.achievements;
  public readonly activitiesCount = this.store.activitiesCount;
  public readonly pendingCount = this.store.pendingCount;
  public readonly achievementsPendingCount = this.store.achievementsPendingCount;
  public readonly loading = this.store.loading;
  public readonly error = this.store.error;

  /** Загружает все данные профиля параллельно */
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
      activities: this.http.get<Activity[]>(`${API_URL}/activities`),
      userActivities: this.http.get<UserActivity[]>(`${API_URL}/userActivities`, { params: { userId: Number(userId) } }),
      achievements: this.http.get<Achievement[]>(`${API_URL}/achievements`),
      userAchievements: this.http.get<any[]>(`${API_URL}/userAchievements`, { params: { userId: Number(userId) } }),
    })
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: ({ user, activities, userActivities, achievements, userAchievements }) => {
          const mapped = this.adapter.toUser(user);
          if (!mapped) {
            this.store.setError('Пользователь не найден. Выйдите и войдите заново.');
            return;
          }
          this.store.setUser(mapped);
          this.store.setActivities(this.adapter.toActivities(activities));
          this.store.setUserActivities(this.adapter.toUserActivities(userActivities));
          this.store.setAchievements(this.adapter.toAchievements(achievements));
          this.store.setUserAchievements(this.adapter.toUserAchievements(userAchievements));
        },
        error: () => {
          this.store.setError('Не удалось загрузить данные. Проверьте что json-server запущен: pnpm api');
        },
      });
  }

  /** Отправляет заявку на активность со статусом pending */
  public submitActivity(activityId: string, comment: string): void {
    const userId = getUserIdFromToken();
    if (!userId) return;

    const payload: Omit<UserActivity, 'id'> = {
      userId,
      activityId,
      status: 'pending',
      comment,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    this.http.post<UserActivity>(`${API_URL}/userActivities`, payload).subscribe((ua) => {
      this.store.addUserActivity(ua);
    });
  }

  /** Отправляет заявку на достижение со статусом pending */
  public submitAchievement(achievementId: string, comment: string): void {
    const userId = getUserIdFromToken();
    if (!userId) return;

    const payload: Omit<import('shared-models').UserAchievement, 'id'> = {
      userId,
      achievementId,
      status: 'pending',
      comment,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    this.http.post<import('shared-models').UserAchievement>(`${API_URL}/userAchievements`, payload).subscribe((ua) => {
      this.store.addUserAchievement(ua);
    });
  }

  /** Обновляет поля профиля (имя, аватар) */
  public updateUser(patch: Partial<User>): void {
    const userId = getUserIdFromToken();
    if (!userId) return;

    this.http.patch<User>(`${API_URL}/users/${userId}`, patch).subscribe((updated) => {
      this.store.setUser(this.adapter.toUser(updated) ?? this.store.user());
    });
  }
}
