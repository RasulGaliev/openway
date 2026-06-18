import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProfileFacade } from '../../data/profile.facade';
import { AvatarUploadComponent } from './components/avatar-upload.component';
import { EditNameFormComponent } from './components/edit-name-form.component';
import { UserStatsComponent } from './components/user-stats.component';
import { ActivityCardComponent } from './components/activity-card.component';
import { AchievementCardComponent } from './components/achievement-card.component';
import { AddActivityFormComponent, ActivitySubmit } from './components/add-activity-form.component';
import { AddAchievementFormComponent, AchievementSubmit } from './components/add-achievement-form.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    AvatarUploadComponent,
    EditNameFormComponent,
    UserStatsComponent,
    ActivityCardComponent,
    AchievementCardComponent,
    AddActivityFormComponent,
    AddAchievementFormComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  protected readonly facade = inject(ProfileFacade);
  protected readonly isEditingName = signal(false);
  protected readonly showAddForm = signal(false);
  protected readonly showAddAchievementForm = signal(false);

  protected readonly initials = computed(() => {
    const parts = (this.facade.user()?.name ?? '').trim().split(' ');
    return parts.slice(0, 2).map((p) => p[0] ?? '').join('').toUpperCase();
  });

  constructor() {
    this.facade.init();
  }

  protected onAvatarChange(base64: string): void {
    this.facade.updateUser({ avatar: base64 });
  }

  protected onNameSave(name: string): void {
    if (name) this.facade.updateUser({ name });
    this.isEditingName.set(false);
  }

  protected onActivitySubmit(data: ActivitySubmit): void {
    this.facade.submitActivity(data.activityId, data.comment);
    this.showAddForm.set(false);
  }

  protected onAchievementSubmit(data: AchievementSubmit): void {
    this.facade.submitAchievement(data.achievementId, data.comment);
    this.showAddAchievementForm.set(false);
  }
}
