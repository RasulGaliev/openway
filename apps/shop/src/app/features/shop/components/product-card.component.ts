import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from 'shared-models';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class.card--out]="!product().isActive || product().stock === 0"
         (click)="select.emit(product())">
      <div class="card__media">
        @if (product().image) {
          <img class="card__img" [src]="product().image" [alt]="product().name" loading="lazy" />
        } @else {
          <div class="card__emoji">{{ product().emoji }}</div>
        }
        <span class="card__category">{{ product().category }}</span>
        @if (!product().isActive || product().stock === 0) {
          <span class="card__sold">Нет в наличии</span>
        }
      </div>
      <div class="card__body">
        <h3 class="card__name">{{ product().name }}</h3>
        <p class="card__desc">{{ product().description }}</p>
      </div>
      <div class="card__footer">
        @if (!product().isActive || product().stock === 0) {
          <span class="card__badge card__badge--out">0 шт.</span>
        } @else {
          <span class="card__badge card__badge--stock">{{ product().stock }} шт.</span>
        }
        <span class="card__price">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2-2.5 2.5S9 13.5 9 15a2.5 2.5 0 0 0 5 0"/>
          </svg>
          {{ product().price }}
        </span>
      </div>
    </div>
  `,
  styles: `
    .card {
      display: flex; flex-direction: column; height: 100%;
      background: #fff; border: 1px solid #eef2f7; border-radius: 18px; overflow: hidden;
      box-shadow: 0 4px 16px -8px rgba(15,23,42,.12);
      cursor: pointer; transition: box-shadow .2s, transform .2s, border-color .2s;
      &:hover:not(.card--out) {
        box-shadow: 0 20px 44px -22px rgba(15,23,42,.32); transform: translateY(-3px); border-color: #dbe3ee;
        .card__img { transform: scale(1.05); }
      }
      &--out { opacity: .72; cursor: default; }
    }
    .card__media {
      position: relative; height: 180px; overflow: hidden;
      background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    }
    .card__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s ease; }
    .card__emoji { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 60px; }
    .card__category {
      position: absolute; top: 12px; left: 12px;
      font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px;
      color: #0f172a; background: rgba(255,255,255,.9); backdrop-filter: blur(4px);
      padding: 4px 10px; border-radius: 999px; box-shadow: 0 2px 6px rgba(15,23,42,.12);
    }
    .card__sold {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      background: rgba(15,23,42,.5); color: #fff; font-size: 13px; font-weight: 700; letter-spacing: .3px;
    }
    .card__body { flex: 1; padding: 16px 16px 8px; display: flex; flex-direction: column; gap: 5px; }
    .card__name { margin: 0; font-size: 15px; font-weight: 700; color: #0f172a; letter-spacing: -.2px; }
    .card__desc { margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; flex: 1; }
    .card__footer {
      padding: 12px 16px; display: flex; align-items: center;
      justify-content: space-between; border-top: 1px solid #f1f5f9;
    }
    .card__badge { font-size: 11px; padding: 3px 9px; border-radius: 999px; font-weight: 600; }
    .card__badge--stock { background: #ecfdf5; color: #059669; }
    .card__badge--out   { background: #f1f5f9; color: #94a3b8; }
    .card__price {
      display: flex; align-items: center; gap: 4px;
      font-size: 16px; font-weight: 700; color: #c2720a;
    }
  `,
})
export class ProductCardComponent {
  public readonly product = input.required<Product>();
  public readonly select = output<Product>();
}
