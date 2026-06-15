import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Transaction } from 'shared-models';

@Component({
  selector: 'app-transaction-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tx" [class.tx--earn]="item().type === 'earn'" [class.tx--spend]="item().type === 'spend'">
      <div class="tx__info">
        <span class="tx__description">{{ item().description }}</span>
        <span class="tx__date">{{ item().createdAt }}</span>
      </div>
      <span class="tx__amount">
        {{ item().type === 'earn' ? '+' : '−' }}{{ item().amount }}
      </span>
    </div>
  `,
  styles: `
    .tx {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      &:last-child { border-bottom: none; }
    }
    .tx__info { display: flex; flex-direction: column; gap: 2px; }
    .tx__description { font-size: 14px; color: #222; }
    .tx__date { font-size: 12px; color: #999; }
    .tx__amount { font-weight: 600; font-size: 15px; }
    .tx--earn .tx__amount { color: #2e7d32; }
    .tx--spend .tx__amount { color: #c62828; }
  `,
})
export class TransactionItemComponent {
  public readonly item = input.required<Transaction>();
}
