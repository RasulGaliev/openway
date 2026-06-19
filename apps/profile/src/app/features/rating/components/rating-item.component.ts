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
      padding: 14px 18px;
      border-radius: 14px;
      background: #fff;
      border: 1px solid #eef2f7;
      transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .item:hover {
      border-color: #dbe3ee;
      box-shadow: 0 10px 28px -16px rgba(15, 23, 42, 0.3);
      transform: translateY(-1px);
    }
    .item--current {
      background: rgba(28, 173, 237, 0.06);
      border-color: rgba(28, 173, 237, 0.35);
      box-shadow: 0 0 0 1px rgba(28, 173, 237, 0.15);
    }
    .item--top3 { border-color: #e7ecf3; }

    .item__rank {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      color: #94a3b8;
      flex-shrink: 0;
    }
    .item__rank--gold,
    .item__rank--silver,
    .item__rank--bronze {
      font-size: 22px;
      border-radius: 50%;
    }
    .item__rank--gold   { box-shadow: 0 0 0 2px #fde68a, 0 6px 14px -6px rgba(245, 158, 11, 0.7); }
    .item__rank--silver { box-shadow: 0 0 0 2px #e2e8f0, 0 6px 14px -6px rgba(148, 163, 184, 0.6); }
    .item__rank--bronze { box-shadow: 0 0 0 2px #fed7aa, 0 6px 14px -6px rgba(180, 83, 9, 0.6); }

    .item__avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1caded, #4338ca);
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      box-shadow: 0 0 0 2px #fff, 0 2px 8px -2px rgba(28, 173, 237, 0.5);

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
      font-weight: 600;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .item__you {
      font-size: 11px;
      background: #1caded;
      color: #fff;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
    }
    .item__position { font-size: 12px; color: #94a3b8; }

    .item__xp {
      display: flex;
      align-items: baseline;
      gap: 4px;
      flex-shrink: 0;
      padding: 6px 12px;
      background: rgba(28, 173, 237, 0.08);
      border-radius: 999px;
    }
    .item__xp-value { font-size: 16px; font-weight: 700; color: #1180b3; }
    .item__xp-label { font-size: 11px; font-weight: 600; color: #5fb8e0; }
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
