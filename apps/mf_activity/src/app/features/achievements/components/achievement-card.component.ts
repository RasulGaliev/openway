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
      position: relative;
      display: flex; flex-direction: column;
      height: 100%;
      background: #fff; border: 1px solid #eef2f7; border-radius: 18px; padding: 24px;
      box-shadow: 0 4px 16px -8px rgba(15, 23, 42, 0.1);
      transition: box-shadow .2s, transform .2s, border-color .2s;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #f59e0b, #b45309);
      opacity: 0; transition: opacity .2s;
    }
    .card:hover {
      box-shadow: 0 18px 40px -20px rgba(15, 23, 42, 0.28);
      transform: translateY(-3px);
      border-color: #f3dcc0;
    }
    .card:hover::before { opacity: 1; }
    .card__icon-wrap {
      width: 60px; height: 60px; border-radius: 16px;
      background: linear-gradient(135deg, #fef3c7, #fed7aa);
      color: #c2720a;
      display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
      box-shadow: inset 0 0 0 1px rgba(194, 114, 10, 0.18);
      app-icon { width: 30px; height: 30px; }
    }
    .card__title { margin: 0 0 8px; font-size: 17px; font-weight: 700; letter-spacing: -0.2px; color: #0f172a; }
    .card__desc  { margin: 0; font-size: 13px; color: #64748b; line-height: 1.55; flex: 1; }
    .card__rewards { display: flex; gap: 8px; margin-top: 18px; flex-wrap: wrap; }
    .reward { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px; }
    .reward--coins { background: #fff7ed; color: #c2720a; }
    .reward--xp    { background: #eff6ff; color: #1d6fcf; }
  `,
})
export class AchievementCardComponent {
  public readonly achievement = input.required<Achievement>();
}
