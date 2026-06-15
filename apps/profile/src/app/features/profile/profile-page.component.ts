import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProfileFacade } from '../../data/profile.facade';
import { PointsBalanceComponent } from './components/points-balance.component';
import { TransactionListComponent } from './components/transaction-list.component';
import { OrderListComponent } from './components/order-list.component';
import { AvatarUploadComponent } from './components/avatar-upload.component';
import { EditNameFormComponent } from './components/edit-name-form.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    PointsBalanceComponent,
    TransactionListComponent,
    OrderListComponent,
    AvatarUploadComponent,
    EditNameFormComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  protected readonly facade = inject(ProfileFacade);
  protected readonly isEditing = signal(false);

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
    this.isEditing.set(false);
  }
}
