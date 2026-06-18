import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from 'shared-models';
import { AdminFacade } from '../../data/admin.facade';

@Component({
  selector: 'app-products-page',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__head">
        <h2 class="page__title">Товары</h2>
        <button class="btn-primary" (click)="openCreate()">+ Добавить товар</button>
      </div>

      @if (facade.loading()) {
        <p class="state">Загрузка...</p>
      } @else {
        <div class="grid">
          @for (p of facade.products(); track p.id) {
            <div class="card" [class.card--inactive]="!p.isActive">
              <div class="card__emoji">{{ p.emoji }}</div>
              <div class="card__body">
                <span class="card__category">{{ p.category }}</span>
                <h3 class="card__name">{{ p.name }}</h3>
                <p class="card__desc">{{ p.description }}</p>
              </div>
              <div class="card__footer">
                <div class="card__meta">
                  <span class="card__price">🪙 {{ p.price }}</span>
                  <span class="card__stock">{{ p.stock }} шт.</span>
                  @if (!p.isActive) { <span class="card__badge">скрыт</span> }
                </div>
                <div class="card__actions">
                  <button class="btn-edit" (click)="openEdit(p)">Изменить</button>
                  <button class="btn-del" (click)="onDelete(p)">Удалить</button>
                </div>
              </div>
            </div>
          }
        </div>
      }

      @if (editing()) {
        <div class="overlay" (click)="close()">
          <div class="modal" (click)="$event.stopPropagation()">
            <h3 class="modal__title">{{ isNew() ? 'Новый товар' : 'Редактировать товар' }}</h3>
            <form [formGroup]="form" (ngSubmit)="save()">
              <div class="grid2">
                <div class="field"><label>Название</label><input formControlName="name" /></div>
                <div class="field"><label>Эмодзи</label><input formControlName="emoji" maxlength="4" /></div>
              </div>
              <div class="field"><label>Описание</label><textarea formControlName="description" rows="3"></textarea></div>
              <div class="grid2">
                <div class="field"><label>Категория</label><input formControlName="category" /></div>
                <div class="field"><label>Цена (Bivcoins)</label><input formControlName="price" type="number" /></div>
              </div>
              <div class="grid2">
                <div class="field"><label>Остаток</label><input formControlName="stock" type="number" /></div>
                <div class="field"><label>Статус</label>
                  <select formControlName="isActive">
                    <option [ngValue]="true">Активен</option>
                    <option [ngValue]="false">Скрыт</option>
                  </select>
                </div>
              </div>
              <div class="modal__actions">
                <button type="button" class="btn-cancel" (click)="close()">Отмена</button>
                <button type="submit" class="btn-primary" [disabled]="form.invalid">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: 12px; }
    .page__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
    .page__title { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }

    .card {
      display: flex; flex-direction: column; background: #fff;
      border-radius: 12px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
      &--inactive { opacity: .6; }
    }
    .card__emoji {
      height: 100px; display: flex; align-items: center; justify-content: center;
      font-size: 50px; background: #f5f6fa;
    }
    .card__body { padding: 14px 16px 8px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
    .card__category { font-size: 10px; color: #1caded; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
    .card__name { margin: 0; font-size: 14px; font-weight: 600; color: #1a1a1a; }
    .card__desc { margin: 0; font-size: 12px; color: #888; line-height: 1.5; }

    .card__footer { padding: 10px 16px; border-top: 1px solid #f0f0f0; display: flex; flex-direction: column; gap: 8px; }
    .card__meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .card__price { font-size: 14px; font-weight: 700; color: #c2720a; }
    .card__stock { font-size: 12px; color: #999; }
    .card__badge { font-size: 10px; background: #f5f5f5; color: #888; padding: 2px 8px; border-radius: 8px; }
    .card__actions { display: flex; gap: 6px; }

    .btn-edit, .btn-del, .btn-primary, .btn-cancel {
      padding: 6px 12px; border-radius: 6px; font-size: 12px;
      font-weight: 500; cursor: pointer; border: none; flex: 1;
    }
    .btn-edit { background: #f0f9ff; color: #0369a1; }
    .btn-del { background: #fff; color: #c62828; border: 1px solid #ffcdd2; }
    .btn-primary { background: #1caded; color: #fff; padding: 8px 16px; font-size: 13px; flex: none; &:disabled { opacity: .5; } }
    .btn-cancel { background: #f0f0f0; color: #555; padding: 8px 16px; font-size: 13px; flex: none; }

    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px;
    }
    .modal { background: #fff; border-radius: 14px; padding: 24px; width: 100%; max-width: 480px; }
    .modal__title { margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #1a1a1a; }
    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    .field label { font-size: 12px; color: #666; }
    .field input, .field select, .field textarea {
      padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px;
      font-size: 14px; outline: none; font-family: inherit;
      &:focus { border-color: #1caded; }
    }
    .field textarea { resize: vertical; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .modal__actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px; }

    .state { padding: 32px; text-align: center; color: #999; }
  `,
})
export class ProductsPageComponent {
  protected readonly facade = inject(AdminFacade);
  private readonly fb = inject(FormBuilder);

  protected readonly editing = signal<Product | null>(null);
  protected readonly isNew = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    emoji: ['📦', Validators.required],
    category: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    isActive: [true, Validators.required],
  });

  constructor() {
    this.facade.init();
  }

  protected openCreate(): void {
    this.form.reset({ name: '', description: '', emoji: '📦', category: '', price: 0, stock: 0, isActive: true });
    this.isNew.set(true);
    this.editing.set({} as Product);
  }

  protected openEdit(p: Product): void {
    this.form.reset({
      name: p.name,
      description: p.description,
      emoji: p.emoji,
      category: p.category,
      price: p.price,
      stock: p.stock,
      isActive: p.isActive,
    });
    this.isNew.set(false);
    this.editing.set(p);
  }

  protected close(): void {
    this.editing.set(null);
  }

  protected save(): void {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue();
    if (this.isNew()) {
      this.facade.createProduct(payload);
    } else {
      const p = this.editing();
      if (p) this.facade.updateProduct(p.id, payload);
    }
    this.close();
  }

  protected onDelete(p: Product): void {
    if (confirm(`Удалить товар «${p.name}»?`)) {
      this.facade.deleteProduct(p.id);
    }
  }
}
