import { Injectable } from '@angular/core';
import { Achievement, Activity, User, UserAchievement, UserActivity } from 'shared-models';

@Injectable()
export class ProfileAdapter {
  public toUser(raw: User | undefined): User | null {
    if (!raw) return null;
    const { password: _, ...user } = raw;
    return user as User;
  }

  public toActivity(raw: Activity): Activity {
    return { ...raw, coinsReward: Number(raw.coinsReward), xpReward: Number(raw.xpReward) };
  }

  public toActivities(raw: Activity[]): Activity[] {
    return raw.map((a) => this.toActivity(a));
  }

  public toUserActivity(raw: UserActivity): UserActivity {
    return { ...raw };
  }

  public toUserActivities(raw: UserActivity[]): UserActivity[] {
    return raw.map((ua) => this.toUserActivity(ua));
  }

  public toAchievement(raw: Achievement): Achievement {
    return { ...raw, coinsReward: Number(raw.coinsReward), xpReward: Number(raw.xpReward) };
  }

  public toAchievements(raw: Achievement[]): Achievement[] {
    return raw.map((a) => this.toAchievement(a));
  }

  public toUserAchievements(raw: UserAchievement[]): UserAchievement[] {
    return raw.map((ua) => ({ ...ua }));
  }
}
