import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface RatingUser {
  id: string;
  name: string;
  position: string;
  xp: number;
  avatar?: string;
}

@Component({
  selector: 'app-rating-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="item" [class.item--current]="isCurrent()" [class.item--top3]="rank() <= 3">
      <span class="item__rank" [class.item__rank--gold]="rank() === 1"
                               [class.item__rank--silver]="rank() === 2"
                               [class.item__rank--bronze]="rank() === 3">
        {{ rank() <= 3 ? medals[rank() - 1] : rank() }}
      </span>

      <div class="item__avatar">
        @if (user().avatar) {
          <img [src]="user().avatar" [alt]="user().name" />
        } @else {
          {{ initials() }}
        }
      </div>

      <div class="item__info">
        <span class="item__name">
          {{ user().name }}
          @if (isCurrent()) { <span class="item__you">вы</span> }
        </span>
        <span class="item__position">{{ user().position }}</span>
      </div>

      <div class="item__xp">
        <span class="item__xp-value">{{ user().xp }}</span>
        <span class="item__xp-label">XP</span>
      </div>
    </div>
  `,
  styles: `
    .item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      border-radius: 10px;
      background: #fff;
      transition: background 0.15s;
    }
    .item--current { background: #f0f9ff; border: 1px solid #bae6fd; }
    .item--top3 { background: #fafafa; }

    .item__rank {
      width: 28px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: #999;
      flex-shrink: 0;
    }
    .item__rank--gold   { font-size: 18px; color: #f59e0b; }
    .item__rank--silver { font-size: 18px; color: #94a3b8; }
    .item__rank--bronze { font-size: 18px; color: #b45309; }

    .item__avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;

      img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
    }

    .item__info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .item__name {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .item__you {
      font-size: 11px;
      background: #1caded;
      color: #fff;
      padding: 1px 6px;
      border-radius: 8px;
      font-weight: 400;
    }
    .item__position { font-size: 12px; color: #999; }

    .item__xp {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
    }
    .item__xp-value { font-size: 16px; font-weight: 700; color: #1caded; }
    .item__xp-label { font-size: 11px; color: #aaa; }
  `,
})
export class RatingItemComponent {
  public readonly user = input.required<RatingUser>();
  public readonly rank = input.required<number>();
  public readonly isCurrent = input<boolean>(false);

  protected readonly medals = ['🥇', '🥈', '🥉'];

  protected readonly initials = computed(() => {
    const parts = this.user().name.trim().split(' ');
    return parts.slice(0, 2).map((p) => p[0] ?? '').join('').toUpperCase();
  });
}
