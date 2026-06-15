import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Order } from 'shared-models';

const STATUS_LABEL: Record<Order['status'], string> = {
  pending: 'В обработке',
  ready: 'Готов',
  received: 'Получен',
};

@Component({
  selector: 'app-order-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="order-list">
      <h3 class="order-list__title">Мои заказы ({{ items().length }})</h3>
      @if (items().length === 0) {
        <p class="order-list__empty">Заказов пока нет</p>
      } @else {
        @for (order of items(); track order.id) {
          <div class="order">
            <div class="order__info">
              <span class="order__id">Заказ #{{ order.id }}</span>
              <span class="order__date">{{ order.createdAt }}</span>
            </div>
            <div class="order__right">
              <span class="order__price">{{ order.totalPrice }} баллов</span>
              <span class="order__status" [class]="'order__status--' + order.status">
                {{ statusLabel(order.status) }}
              </span>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .order-list { display: flex; flex-direction: column; }
    .order-list__title { font-size: 16px; font-weight: 600; margin: 0 0 8px; color: #333; }
    .order-list__empty { font-size: 14px; color: #999; margin: 16px 0; }
    .order {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      &:last-child { border-bottom: none; }
    }
    .order__info { display: flex; flex-direction: column; gap: 2px; }
    .order__id { font-size: 14px; font-weight: 500; color: #222; }
    .order__date { font-size: 12px; color: #999; }
    .order__right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .order__price { font-size: 14px; font-weight: 600; }
    .order__status {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
      font-weight: 500;
    }
    .order__status--pending { background: #fff3e0; color: #e65100; }
    .order__status--ready   { background: #e8f5e9; color: #2e7d32; }
    .order__status--received { background: #f3f4f6; color: #555; }
  `,
})
export class OrderListComponent {
  public readonly items = input<Order[]>([]);

  protected statusLabel(status: Order['status']): string {
    return STATUS_LABEL[status];
  }
}
