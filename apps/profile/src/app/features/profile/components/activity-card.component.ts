import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Activity, UserActivity } from 'shared-models';
import { IconComponent } from 'shared-ui';

export interface UserActivityWithDetails extends UserActivity {
  activity: Activity | null;
}

const STATUS_LABEL: Record<UserActivity['status'], string> = {
  pending: 'На рассмотрении',
  approved: 'Одобрено',
  rejected: 'Отклонено',
};

@Component({
  selector: 'app-activity-card',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" (click)="expanded.set(!expanded())">
      <div class="card__header">
        <div class="card__icon">
          @if (item().activity?.icon) {
            <app-icon [name]="item().activity!.icon" />
          }
        </div>
        <div class="card__info">
          <span class="card__title">{{ item().activity?.title }}</span>
          <span class="card__date">{{ item().createdAt }}</span>
        </div>
        <span class="card__status" [class]="'card__status--' + item().status">
          {{ statusLabel(item().status) }}
        </span>
      </div>

      @if (expanded()) {
        <div class="card__body">
          @if (item().comment) {
            <p class="card__comment">{{ item().comment }}</p>
          }
          <div class="card__rewards">
            <span class="reward reward--coins">+{{ item().activity?.coinsReward }} Bivcoins</span>
            <span class="reward reward--xp">+{{ item().activity?.xpReward }} XP</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .card {
      padding: 12px;
      border: 1px solid #eee;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;
      &:hover { background: #fafafa; }
    }
    .card__header { display: flex; align-items: center; gap: 12px; }
    .card__icon {
      width: 38px; height: 38px; border-radius: 10px;
      background: #f5f6fa;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; font-size: 20px;
    }
    .card__info { flex: 1; display: flex; flex-direction: column; }
    .card__title { font-size: 14px; font-weight: 500; color: #1a1a1a; }
    .card__date { font-size: 12px; color: #999; }
    .card__status { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 500; white-space: nowrap; }
    .card__status--approved { background: #e8f5e9; color: #2e7d32; }
    .card__status--pending  { background: #fff3e0; color: #e65100; }
    .card__status--rejected { background: #fce4ec; color: #c62828; }
    .card__body { margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0f0f0; }
    .card__comment { margin: 0 0 10px; font-size: 13px; color: #555; }
    .card__rewards { display: flex; gap: 12px; }
    .reward { font-size: 13px; font-weight: 500; padding: 3px 10px; border-radius: 6px; }
    .reward--coins { background: #fff3e0; color: #e65100; }
    .reward--xp    { background: #e3f2fd; color: #1565c0; }
  `,
})
export class ActivityCardComponent {
  public readonly item = input.required<UserActivityWithDetails>();
  protected readonly expanded = signal(false);

  protected statusLabel(status: UserActivity['status']): string {
    return STATUS_LABEL[status];
  }
}
