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
      padding: 14px;
      border: 1px solid #eef2f7;
      border-radius: 14px;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
      &:hover {
        border-color: #dbe3ee;
        box-shadow: 0 10px 28px -16px rgba(15, 23, 42, 0.3);
        transform: translateY(-1px);
      }
    }
    .card__header { display: flex; align-items: center; gap: 12px; }
    .card__icon {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
      color: #475569;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; font-size: 20px;
    }
    .card__info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .card__title { font-size: 14px; font-weight: 600; color: #0f172a; }
    .card__date { font-size: 12px; color: #94a3b8; }
    .card__status {
      font-size: 11px; padding: 3px 10px; border-radius: 999px; font-weight: 600;
      white-space: nowrap; display: inline-flex; align-items: center; gap: 5px;
      &::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.7; }
    }
    .card__status--approved { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
    .card__status--pending  { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }
    .card__status--rejected { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
    .card__body { margin-top: 12px; padding-top: 12px; border-top: 1px solid #f1f5f9; }
    .card__comment { margin: 0 0 10px; font-size: 13px; color: #475569; line-height: 1.5; }
    .card__rewards { display: flex; gap: 8px; }
    .reward { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px; }
    .reward--coins { background: #fff7ed; color: #c2410c; }
    .reward--xp    { background: #eff6ff; color: #2563eb; }
  `,
})
export class ActivityCardComponent {
  public readonly item = input.required<UserActivityWithDetails>();
  protected readonly expanded = signal(false);

  protected statusLabel(status: UserActivity['status']): string {
    return STATUS_LABEL[status];
  }
}
