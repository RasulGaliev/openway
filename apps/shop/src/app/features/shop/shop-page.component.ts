import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, Product, User } from 'shared-models';
import { ProductCardComponent } from './components/product-card.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { OrderCouponComponent } from './components/order-coupon.component';

const API_URL = 'http://localhost:3000';

function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('openway_token');
  if (!token) return null;
  try {
    const raw = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = raw + '='.repeat((4 - (raw.length % 4)) % 4);
    return JSON.parse(atob(padded))?.sub ?? null;
  } catch { return null; }
}

@Component({
  selector: 'app-shop-page',
  imports: [ProductCardComponent, ProductDetailComponent, OrderCouponComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Магазин мерча</h2>
        <p class="page__subtitle">Тратьте Bivcoins на фирменную продукцию Openway</p>
      </div>

      @if (loading()) {
        <p class="state">Загрузка...</p>
      } @else {
        <div class="grid">
          @for (item of products(); track item.id) {
            <app-product-card [product]="item" (select)="onSelect($event)" />
          }
        </div>
      }

      @if (selected()) {
        <app-product-detail
          [product]="selected()!"
          [loading]="buying()"
          [error]="buyError()"
          (close)="closeDetail()"
          (buy)="onBuy($event)"
        />
      }

      @if (lastOrder() && lastProduct()) {
        <app-order-coupon
          [order]="lastOrder()!"
          [product]="lastProduct()!"
          (close)="closeCoupon()"
        />
      }
    </div>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; flex-direction: column; gap: 4px; }
    .page__title { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a; }
    .page__subtitle { margin: 0; font-size: 14px; color: #888; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .state { color: #999; text-align: center; padding: 48px; }
  `,
})
export class ShopPageComponent {
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(true);
  protected readonly products = signal<Product[]>([]);
  protected readonly selected = signal<Product | null>(null);
  protected readonly buying = signal(false);
  protected readonly buyError = signal('');
  protected readonly lastOrder = signal<Order | null>(null);
  protected readonly lastProduct = signal<Product | null>(null);

  constructor() {
    this.http.get<Product[]>(`${API_URL}/products`).subscribe((list) => {
      this.products.set(list);
      this.loading.set(false);
    });
  }

  protected onSelect(product: Product): void {
    if (!product.isActive || product.stock === 0) return;
    this.selected.set(product);
    this.buyError.set('');
  }

  protected closeDetail(): void {
    this.selected.set(null);
    this.buyError.set('');
  }

  protected closeCoupon(): void {
    this.lastOrder.set(null);
    this.lastProduct.set(null);
  }

  protected onBuy(product: Product): void {
    const userId = getUserIdFromToken();
    if (!userId) return;

    this.buying.set(true);
    this.buyError.set('');

    // Проверяем баланс пользователя
    this.http.get<User>(`${API_URL}/users/${userId}`).subscribe((user) => {
      if (user.coins < product.price) {
        this.buyError.set(`Недостаточно Bivcoins. Не хватает: ${product.price - user.coins}`);
        this.buying.set(false);
        return;
      }

      // Списываем монеты, уменьшаем остаток, создаём заказ
      const newBalance = user.coins - product.price;
      const newStock = product.stock - 1;

      const order: Omit<Order, 'id'> = {
        userId: Number(userId) as any,
        productId: Number(product.id) as any,
        quantity: 1,
        totalPrice: product.price,
        status: 'pending',
        createdAt: new Date().toISOString().slice(0, 10),
      };

      Promise.all([
        this.http.patch(`${API_URL}/users/${userId}`, { coins: newBalance }).toPromise(),
        this.http.patch(`${API_URL}/products/${product.id}`, { stock: newStock }).toPromise(),
        this.http.post<Order>(`${API_URL}/orders`, order).toPromise(),
      ]).then(([_, __, created]) => {
        // Обновляем продукт в локальном списке
        this.products.update((list) =>
          list.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p)),
        );
        this.lastOrder.set(created as Order);
        this.lastProduct.set(product);
        this.selected.set(null);
        this.buying.set(false);
      }).catch(() => {
        this.buyError.set('Не удалось завершить покупку. Попробуйте позже.');
        this.buying.set(false);
      });
    });
  }
}
