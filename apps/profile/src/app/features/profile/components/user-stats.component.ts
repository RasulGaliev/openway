import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from 'shared-models';

@Component({
  selector: 'app-user-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stats">
      <div class="stats__item">
        <div class="stats__icon-wrap stats__icon-wrap--coins">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2-2.5 2.5S9 13.5 9 15a2.5 2.5 0 0 0 5 0"/>
          </svg>
        </div>
        <div class="stats__info">
          <span class="stats__value">{{ user().coins }}</span>
          <span class="stats__label">Bivcoins</span>
        </div>
      </div>

      <div class="stats__divider"></div>

      <div class="stats__item">
        <div class="stats__icon-wrap stats__icon-wrap--xp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div class="stats__info">
          <span class="stats__value">{{ user().xp }}</span>
          <span class="stats__label">Опыт</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .stats {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 14px 18px;
      background: #f5f6fa;
      border-radius: 10px;
      margin-top: 8px;
    }
    .stats__item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .stats__icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stats__icon-wrap--coins {
      background: #fff3e0;
      color: #bf7000;
    }
    .stats__icon-wrap--xp {
      background: #e8f4ff;
      color: #1caded;
    }
    .stats__info {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .stats__value {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1;
    }
    .stats__label {
      font-size: 11px;
      color: #999;
      letter-spacing: .3px;
    }
    .stats__divider {
      width: 1px;
      height: 36px;
      background: #e0e0e0;
    }
  `,
})
export class UserStatsComponent {
  public readonly user = input.required<User>();
}
