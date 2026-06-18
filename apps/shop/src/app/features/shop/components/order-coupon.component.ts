import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Order, Product } from 'shared-models';

@Component({
  selector: 'app-order-coupon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="close.emit()">
      <div class="coupon" (click)="$event.stopPropagation()">
        <div class="coupon__check">✓</div>
        <h2 class="coupon__title">Покупка совершена!</h2>
        <p class="coupon__subtitle">Покажите этот купон сотруднику HR для получения товара</p>

        <div class="coupon__card">
          <div class="coupon__product">
            <span class="coupon__emoji">{{ product().emoji }}</span>
            <div>
              <p class="coupon__product-name">{{ product().name }}</p>
              <p class="coupon__product-price">{{ product().price }} Bivcoins</p>
            </div>
          </div>

          <div class="coupon__divider">
            <span></span><span class="coupon__scissors">✂</span><span></span>
          </div>

          <div class="coupon__code">
            <span class="coupon__code-label">Номер заказа</span>
            <span class="coupon__code-value">#{{ order().id }}</span>
          </div>
          <p class="coupon__date">{{ order().createdAt }}</p>
        </div>

        <button class="coupon__btn" (click)="close.emit()">Закрыть</button>
      </div>
    </div>
  `,
  styles: `
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 16px;
    }
    .coupon {
      background: #fff; border-radius: 18px; width: 100%; max-width: 380px;
      padding: 32px 24px; display: flex; flex-direction: column;
      align-items: center; gap: 12px; text-align: center;
    }
    .coupon__check {
      width: 56px; height: 56px; border-radius: 50%; background: #e8f5e9;
      color: #2e7d32; font-size: 24px; display: flex; align-items: center; justify-content: center;
    }
    .coupon__title { margin: 0; font-size: 20px; font-weight: 700; color: #1a1a1a; }
    .coupon__subtitle { margin: 0; font-size: 13px; color: #888; line-height: 1.5; }

    .coupon__card {
      width: 100%; background: #f8f9ff; border-radius: 12px;
      border: 1px dashed #c7d2fe; overflow: hidden; margin-top: 4px;
    }
    .coupon__product { display: flex; align-items: center; gap: 12px; padding: 16px; }
    .coupon__emoji { font-size: 36px; }
    .coupon__product-name  { margin: 0; font-size: 15px; font-weight: 600; text-align: left; }
    .coupon__product-price { margin: 0; font-size: 13px; color: #c2720a; font-weight: 500; text-align: left; }

    .coupon__divider {
      display: flex; align-items: center; gap: 0;
      border-top: 2px dashed #c7d2fe; padding: 0 8px;
      color: #c7d2fe; font-size: 16px;
      span:first-child, span:last-child { flex: 1; }
    }
    .coupon__scissors { font-size: 18px; transform: rotate(90deg); display: inline-block; }

    .coupon__code { padding: 12px 16px 4px; display: flex; flex-direction: column; gap: 2px; }
    .coupon__code-label { font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: .5px; }
    .coupon__code-value { font-size: 22px; font-weight: 700; color: #3730a3; letter-spacing: 2px; }
    .coupon__date { margin: 0; padding: 0 16px 12px; font-size: 12px; color: #999; }

    .coupon__btn {
      margin-top: 8px; padding: 11px 36px; background: #1caded;
      color: #fff; border: none; border-radius: 8px; font-size: 15px;
      font-weight: 600; cursor: pointer; width: 100%;
      &:hover { background: #18a0dc; }
    }
  `,
})
export class OrderCouponComponent {
  public readonly order = input.required<Order>();
  public readonly product = input.required<Product>();
  public readonly close = output<void>();
}
