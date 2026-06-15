import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-points-balance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="balance-card">
      <span class="balance-card__label">Баланс баллов</span>
      <span class="balance-card__value">{{ balance() }}</span>
      <div class="balance-card__stats">
        <span class="stat stat--earn">+{{ totalEarned() }} начислено</span>
        <span class="stat stat--spend">−{{ totalSpent() }} списано</span>
      </div>
    </div>
  `,
  styles: `
    .balance-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 32px;
      background: #1caded;
      border-radius: 12px;
      color: #fff;
    }
    .balance-card__label { font-size: 14px; opacity: .8; }
    .balance-card__value { font-size: 56px; font-weight: 700; line-height: 1; }
    .balance-card__stats { display: flex; gap: 16px; font-size: 13px; margin-top: 4px; }
    .stat--earn { opacity: .9; }
    .stat--spend { opacity: .9; }
  `,
})
export class PointsBalanceComponent {
  public readonly balance = input<number>(0);
  public readonly totalEarned = input<number>(0);
  public readonly totalSpent = input<number>(0);
}
