import { computed, Injectable, signal } from '@angular/core';
import { Achievement, Activity, User, UserAchievement, UserActivity } from 'shared-models';

@Injectable()
export class ProfileStore {
  private readonly _user = signal<User | null>(null);
  private readonly _activities = signal<Activity[]>([]);
  private readonly _userActivities = signal<UserActivity[]>([]);
  private readonly _achievements = signal<Achievement[]>([]);
  private readonly _userAchievements = signal<UserAchievement[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  public readonly user = this._user.asReadonly();
  public readonly activities = this._activities.asReadonly();
  public readonly userActivities = this._userActivities.asReadonly();
  public readonly achievements = this._achievements.asReadonly();
  public readonly userAchievements = this._userAchievements.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  /** Активности пользователя с подтягиванием данных справочника */
  public readonly userActivitiesWithDetails = computed(() =>
    this._userActivities().map((ua) => ({
      ...ua,
      activity: this._activities().find((a) => String(a.id) === String(ua.activityId)) ?? null,
    })),
  );

  /** Достижения пользователя с подтягиванием данных справочника */
  public readonly userAchievementsWithDetails = computed(() =>
    this._userAchievements().map((ua) => ({
      ...ua,
      achievement: this._achievements().find((a) => String(a.id) === String(ua.achievementId)) ?? null,
    })),
  );

  public readonly activitiesCount = computed(() => this._userActivities().filter((a) => a.status === 'approved').length);
  public readonly pendingCount = computed(() => this._userActivities().filter((a) => a.status === 'pending').length);

  public setUser(user: User | null): void { this._user.set(user); }
  public setActivities(list: Activity[]): void { this._activities.set(list); }
  public setUserActivities(list: UserActivity[]): void { this._userActivities.set(list); }
  public setAchievements(list: Achievement[]): void { this._achievements.set(list); }
  public setUserAchievements(list: UserAchievement[]): void { this._userAchievements.set(list); }
  public setLoading(val: boolean): void { this._loading.set(val); }
  public setError(msg: string | null): void { this._error.set(msg); }

  public readonly achievementsPendingCount = computed(() =>
    this._userAchievements().filter((a) => a.status === 'pending').length,
  );

  public addUserActivity(ua: UserActivity): void {
    this._userActivities.update((list) => [...list, ua]);
  }

  public addUserAchievement(ua: UserAchievement): void {
    this._userAchievements.update((list) => [...list, ua]);
  }
}
