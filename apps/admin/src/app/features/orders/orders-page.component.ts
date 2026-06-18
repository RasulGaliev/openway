import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AdminFacade } from '../../data/admin.facade';
import { Order } from 'shared-models';

@Component({
  selector: 'app-orders-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <h2 class="page__title">Заказы из магазина</h2>

      @if (facade.loading()) {
        <p class="state">Загрузка...</p>
      } @else if (orders().length === 0) {
        <p class="state">Заказов пока нет</p>
      } @else {
        @for (o of orders(); track o.id) {
          <div class="card">
            <div class="card__emoji">{{ o.product?.emoji }}</div>
            <div class="card__main">
              <p class="card__title">
                #{{ o.id }} · {{ o.product?.name }}
              </p>
              <p class="card__user">
                <strong>{{ o.user?.name }}</strong> · {{ o.user?.position }}
              </p>
              <p class="card__meta">
                {{ o.totalPrice }} Bivcoins · {{ o.createdAt }}
              </p>
            </div>
            <div class="card__right">
              <span class="status" [class]="'status--' + o.status">{{ statusLabel(o.status) }}</span>
              <div class="card__actions">
                @if (o.status === 'pending') {
                  <button class="btn btn--ready" (click)="facade.updateOrderStatus(o.id, 'ready')">
                    Готов к выдаче
                  </button>
                }
                @if (o.status === 'ready') {
                  <button class="btn btn--received" (click)="facade.updateOrderStatus(o.id, 'received')">
                    Выдан
                  </button>
                }
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: 12px; }
    .page__title { margin: 0 0 4px; font-size: 22px; font-weight: 700; color: #1a1a1a; }

    .card {
      display: flex; align-items: center; gap: 16px;
      background: #fff; padding: 14px 18px; border-radius: 12px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .card__emoji {
      width: 52px; height: 52px; border-radius: 10px;
      background: #f5f6fa; display: flex; align-items: center; justify-content: center;
      font-size: 28px; flex-shrink: 0;
    }
    .card__main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .card__title { margin: 0; font-size: 14px; font-weight: 600; color: #1a1a1a; }
    .card__user  { margin: 0; font-size: 13px; color: #555; }
    .card__meta  { margin: 0; font-size: 12px; color: #999; }

    .card__right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .status { font-size: 11px; padding: 3px 10px; border-radius: 10px; font-weight: 500; }
    .status--pending  { background: #fff3e0; color: #e65100; }
    .status--ready    { background: #e8f5e9; color: #2e7d32; }
    .status--received { background: #f3f4f6; color: #555; }

    .card__actions { display: flex; gap: 8px; }
    .btn {
      padding: 6px 12px; border-radius: 6px; border: none;
      font-size: 12px; font-weight: 500; cursor: pointer;
    }
    .btn--ready    { background: #1caded; color: #fff; &:hover { background: #18a0dc; } }
    .btn--received { background: #2e7d32; color: #fff; &:hover { background: #266b29; } }

    .state { padding: 32px; text-align: center; color: #999; }
  `,
})
export class OrdersPageComponent {
  protected readonly facade = inject(AdminFacade);

  protected readonly orders = computed(() => {
    const order: Record<Order['status'], number> = { pending: 0, ready: 1, received: 2 };
    return this.facade.getOrders().sort((a, b) => order[a.status] - order[b.status]);
  });

  constructor() {
    this.facade.init();
  }

  protected statusLabel(status: Order['status']): string {
    return { pending: 'Ожидает', ready: 'Готов к выдаче', received: 'Выдан' }[status];
  }
}
