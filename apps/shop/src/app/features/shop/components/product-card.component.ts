import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from 'shared-models';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class.card--out]="!product().isActive || product().stock === 0"
         (click)="select.emit(product())">
      <div class="card__emoji">{{ product().emoji }}</div>
      <div class="card__body">
        <span class="card__category">{{ product().category }}</span>
        <h3 class="card__name">{{ product().name }}</h3>
        <p class="card__desc">{{ product().description }}</p>
      </div>
      <div class="card__footer">
        @if (!product().isActive || product().stock === 0) {
          <span class="card__badge card__badge--out">Нет в наличии</span>
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
      background: #fff; border-radius: 14px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,.07);
      cursor: pointer; transition: box-shadow .2s, transform .2s;
      &:hover:not(.card--out) { box-shadow: 0 8px 24px rgba(0,0,0,.11); transform: translateY(-2px); }
      &--out { opacity: .6; cursor: default; }
    }
    .card__emoji {
      height: 120px; display: flex; align-items: center; justify-content: center;
      font-size: 56px; background: #f5f6fa;
    }
    .card__body { flex: 1; padding: 16px 16px 8px; display: flex; flex-direction: column; gap: 4px; }
    .card__category { font-size: 11px; color: #1caded; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
    .card__name { margin: 0; font-size: 15px; font-weight: 600; color: #1a1a1a; }
    .card__desc { margin: 0; font-size: 12px; color: #888; line-height: 1.5; flex: 1; }
    .card__footer {
      padding: 12px 16px; display: flex; align-items: center;
      justify-content: space-between; border-top: 1px solid #f0f0f0;
    }
    .card__badge { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 500; }
    .card__badge--stock { background: #e8f5e9; color: #2e7d32; }
    .card__badge--out   { background: #f5f5f5; color: #999; }
    .card__price {
      display: flex; align-items: center; gap: 4px;
      font-size: 15px; font-weight: 700; color: #c2720a;
    }
  `,
})
export class ProductCardComponent {
  public readonly product = input.required<Product>();
  public readonly select = output<Product>();
}
