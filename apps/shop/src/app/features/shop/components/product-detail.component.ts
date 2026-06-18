import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from 'shared-models';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="close.emit()">
      <div class="modal" (click)="$event.stopPropagation()">
        <button class="modal__close" (click)="close.emit()">✕</button>

        <div class="modal__emoji">{{ product().emoji }}</div>

        <div class="modal__body">
          <span class="modal__category">{{ product().category }}</span>
          <h2 class="modal__name">{{ product().name }}</h2>
          <p class="modal__desc">{{ product().description }}</p>

          <div class="modal__meta">
            @if (product().stock > 0 && product().isActive) {
              <span class="badge badge--stock">В наличии: {{ product().stock }} шт.</span>
            } @else {
              <span class="badge badge--out">Нет в наличии</span>
            }
          </div>

          <div class="modal__footer">
            <div class="modal__price">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2-2.5 2.5S9 13.5 9 15a2.5 2.5 0 0 0 5 0"/>
              </svg>
              <span>{{ product().price }} Bivcoins</span>
            </div>

            @if (error()) {
              <p class="modal__error">{{ error() }}</p>
            }

            <button class="modal__btn"
                    [disabled]="!product().isActive || product().stock === 0 || loading()"
                    (click)="buy.emit(product())">
              {{ loading() ? 'Обработка...' : 'Купить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 16px;
    }
    .modal {
      background: #fff; border-radius: 18px; width: 100%; max-width: 440px;
      overflow: hidden; position: relative;
    }
    .modal__close {
      position: absolute; top: 12px; right: 12px;
      background: rgba(0,0,0,.07); border: none; border-radius: 50%;
      width: 32px; height: 32px; cursor: pointer; font-size: 14px;
      display: flex; align-items: center; justify-content: center;
      &:hover { background: rgba(0,0,0,.13); }
    }
    .modal__emoji {
      height: 160px; display: flex; align-items: center; justify-content: center;
      font-size: 80px; background: #f5f6fa;
    }
    .modal__body { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
    .modal__category { font-size: 12px; color: #1caded; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
    .modal__name { margin: 0; font-size: 20px; font-weight: 700; color: #1a1a1a; }
    .modal__desc { margin: 0; font-size: 14px; color: #555; line-height: 1.6; }
    .modal__meta { margin: 4px 0; }
    .badge { font-size: 12px; padding: 3px 10px; border-radius: 10px; font-weight: 500; }
    .badge--stock { background: #e8f5e9; color: #2e7d32; }
    .badge--out   { background: #f5f5f5; color: #999; }
    .modal__footer { display: flex; align-items: center; gap: 16px; margin-top: 8px; flex-wrap: wrap; }
    .modal__price { display: flex; align-items: center; gap: 6px; font-size: 20px; font-weight: 700; color: #c2720a; }
    .modal__error { margin: 0; font-size: 13px; color: #c62828; width: 100%; }
    .modal__btn {
      margin-left: auto; padding: 11px 28px; background: #1caded; color: #fff;
      border: none; border-radius: 8px; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: background .15s;
      &:hover:not(:disabled) { background: #18a0dc; }
      &:disabled { opacity: .5; cursor: not-allowed; }
    }
  `,
})
export class ProductDetailComponent {
  public readonly product = input.required<Product>();
  public readonly loading = input<boolean>(false);
  public readonly error = input<string>('');
  public readonly close = output<void>();
  public readonly buy = output<Product>();
}
