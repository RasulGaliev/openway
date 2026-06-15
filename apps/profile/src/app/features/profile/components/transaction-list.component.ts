import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Transaction } from 'shared-models';
import { TransactionItemComponent } from './transaction-item.component';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tx-list">
      <h3 class="tx-list__title">История транзакций</h3>
      @if (items().length === 0) {
        <p class="tx-list__empty">Транзакций пока нет</p>
      } @else {
        @for (item of items(); track item.id) {
          <app-transaction-item [item]="item" />
        }
      }
    </div>
  `,
  styles: `
    .tx-list { display: flex; flex-direction: column; }
    .tx-list__title { font-size: 16px; font-weight: 600; margin: 0 0 8px; color: #333; }
    .tx-list__empty { font-size: 14px; color: #999; margin: 16px 0; }
  `,
})
export class TransactionListComponent {
  public readonly items = input<Transaction[]>([]);
}
