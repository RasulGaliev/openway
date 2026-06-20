import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from 'shared-models';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="close.emit()">
      <div class="modal" (click)="$event.stopPropagation()">
        <button class="modal__close" (click)="close.emit()">✕</button>

        <div class="modal__media">
          @if (product().image) {
            <img class="modal__img" [src]="product().image" [alt]="product().name" />
          } @else {
            <div class="modal__emoji">{{ product().emoji }}</div>
          }
        </div>

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
      position: fixed; inset: 0; background: rgba(15,23,42,.55);
      backdrop-filter: blur(3px);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 16px;
      animation: fade .2s ease;
    }
    .modal {
      background: #fff; border-radius: 22px; width: 100%; max-width: 460px;
      overflow: hidden; position: relative;
      box-shadow: 0 30px 70px -25px rgba(15,23,42,.5);
      animation: pop .28s cubic-bezier(.16,1,.3,1);
    }
    .modal__close {
      position: absolute; top: 14px; right: 14px; z-index: 2;
      background: rgba(255,255,255,.85); backdrop-filter: blur(4px); border: none; border-radius: 50%;
      width: 34px; height: 34px; cursor: pointer; font-size: 14px; color: #0f172a;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(15,23,42,.18);
      &:hover { background: #fff; }
    }
    .modal__media { height: 220px; background: linear-gradient(135deg, #f1f5f9, #e2e8f0); }
    .modal__img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .modal__emoji {
      height: 100%; display: flex; align-items: center; justify-content: center; font-size: 84px;
    }
    .modal__body { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
    .modal__category { font-size: 11px; color: #1caded; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; }
    .modal__name { margin: 0; font-size: 22px; font-weight: 750; color: #0f172a; letter-spacing: -.4px; }
    .modal__desc { margin: 0; font-size: 14px; color: #475569; line-height: 1.6; }
    .modal__meta { margin: 4px 0; }
    .badge { font-size: 12px; padding: 4px 11px; border-radius: 999px; font-weight: 600; }
    .badge--stock { background: #ecfdf5; color: #059669; }
    .badge--out   { background: #f1f5f9; color: #94a3b8; }
    .modal__footer { display: flex; align-items: center; gap: 16px; margin-top: 10px; flex-wrap: wrap; }
    .modal__price { display: flex; align-items: center; gap: 6px; font-size: 22px; font-weight: 750; color: #c2720a; }
    .modal__error { margin: 0; font-size: 13px; color: #dc2626; width: 100%; }
    .modal__btn {
      margin-left: auto; padding: 12px 30px;
      background: linear-gradient(135deg, #1caded, #2563eb); color: #fff;
      border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: transform .12s, box-shadow .18s;
      box-shadow: 0 8px 18px -8px rgba(28,173,237,.65);
      &:hover:not(:disabled) { transform: translateY(-1px); }
      &:disabled { opacity: .5; cursor: not-allowed; box-shadow: none; }
    }
    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pop { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  `,
})
export class ProductDetailComponent {
  public readonly product = input.required<Product>();
  public readonly loading = input<boolean>(false);
  public readonly error = input<string>('');
  public readonly close = output<void>();
  public readonly buy = output<Product>();
}
