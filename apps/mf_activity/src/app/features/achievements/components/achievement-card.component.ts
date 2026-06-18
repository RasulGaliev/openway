import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Achievement } from 'shared-models';
import { IconComponent } from 'shared-ui';

@Component({
  selector: 'app-achievement-card',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <div class="card__icon-wrap">
        <app-icon [name]="achievement().icon" />
      </div>
      <h3 class="card__title">{{ achievement().title }}</h3>
      <p class="card__desc">{{ achievement().description }}</p>
      <div class="card__rewards">
        <span class="reward reward--coins">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2-2.5 2.5S9 13.5 9 15a2.5 2.5 0 0 0 5 0"/>
          </svg>
          +{{ achievement().coinsReward }} Bivcoins
        </span>
        <span class="reward reward--xp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          +{{ achievement().xpReward }} XP
        </span>
      </div>
    </div>
  `,
  styles: `
    .card {
      display: flex; flex-direction: column;
      height: 100%;
      background: #fff; border-radius: 14px; padding: 24px;
      box-shadow: 0 1px 4px rgba(0,0,0,.07);
      transition: box-shadow .2s, transform .2s;
      &:hover { box-shadow: 0 6px 20px rgba(0,0,0,.1); transform: translateY(-2px); }
    }
    .card__icon-wrap {
      width: 56px; height: 56px; border-radius: 14px;
      background: #fffbeb; color: #c2720a;
      display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
      app-icon { width: 28px; height: 28px; }
    }
    .card__title { margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #1a1a1a; }
    .card__desc  { margin: 0; font-size: 13px; color: #666; line-height: 1.5; flex: 1; }
    .card__rewards { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
    .reward { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
    .reward--coins { background: #fff7ed; color: #c2720a; }
    .reward--xp    { background: #eff6ff; color: #1d6fcf; }
  `,
})
export class AchievementCardComponent {
  public readonly achievement = input.required<Achievement>();
}
