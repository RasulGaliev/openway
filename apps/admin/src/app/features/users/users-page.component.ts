import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'shared-models';
import { AdminFacade } from '../../data/admin.facade';

@Component({
  selector: 'app-users-page',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__head">
        <h2 class="page__title">Сотрудники</h2>
        <button class="btn-primary" (click)="openCreate()">+ Добавить сотрудника</button>
      </div>

      @if (facade.loading()) {
        <p class="state">Загрузка...</p>
      } @else {
        @for (u of facade.users(); track u.id) {
          <div class="row">
            <div class="row__avatar">
              @if (u.avatar) {
                <img [src]="u.avatar" alt="" />
              } @else {
                {{ initials(u.name) }}
              }
            </div>
            <div class="row__main">
              <p class="row__name">
                {{ u.name }}
                <span class="row__role" [class.row__role--admin]="u.role === 'admin'">
                  {{ u.role === 'admin' ? 'Admin' : 'Employee' }}
                </span>
              </p>
              <p class="row__meta">{{ u.email }} · {{ u.position }}</p>
              <p class="row__stats">🪙 {{ u.coins }} Bivcoins · ⭐ {{ u.xp }} XP</p>
            </div>
            <div class="row__actions">
              <button class="btn-edit" (click)="openEdit(u)">Изменить</button>
              <button class="btn-del" (click)="onDelete(u)">Удалить</button>
            </div>
          </div>
        }
      }

      @if (editing()) {
        <div class="overlay" (click)="close()">
          <div class="modal" (click)="$event.stopPropagation()">
            <h3 class="modal__title">{{ isNew() ? 'Новый сотрудник' : 'Редактировать сотрудника' }}</h3>
            <form [formGroup]="form" (ngSubmit)="save()">
              <div class="field"><label>Имя</label><input formControlName="name" /></div>
              <div class="field"><label>Email</label><input formControlName="email" type="email" /></div>
              <div class="field"><label>Должность</label><input formControlName="position" /></div>
              <div class="grid2">
                <div class="field"><label>Роль</label>
                  <select formControlName="role">
                    <option value="employee">Сотрудник</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
                <div class="field"><label>Пароль</label><input formControlName="password" /></div>
              </div>
              <div class="grid2">
                <div class="field"><label>Bivcoins</label><input formControlName="coins" type="number" /></div>
                <div class="field"><label>XP</label><input formControlName="xp" type="number" /></div>
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

    .row {
      display: flex; align-items: center; gap: 14px;
      background: #fff; padding: 14px 18px; border-radius: 12px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .row__avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: #e0f2fe; color: #0369a1; font-weight: 600; font-size: 14px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;
      img { width: 100%; height: 100%; object-fit: cover; }
    }
    .row__main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .row__name { margin: 0; font-size: 14px; font-weight: 600; color: #1a1a1a; display: flex; gap: 8px; align-items: center; }
    .row__role { font-size: 10px; background: #e0f2fe; color: #0369a1; padding: 1px 7px; border-radius: 8px; font-weight: 500; }
    .row__role--admin { background: #fce4ec; color: #c62828; }
    .row__meta { margin: 0; font-size: 12px; color: #888; }
    .row__stats { margin: 0; font-size: 12px; color: #555; }

    .row__actions { display: flex; gap: 6px; }
    .btn-edit, .btn-del, .btn-primary, .btn-cancel {
      padding: 6px 14px; border-radius: 6px; font-size: 12px;
      font-weight: 500; cursor: pointer; border: none;
    }
    .btn-edit { background: #f0f9ff; color: #0369a1; }
    .btn-del { background: #fff; color: #c62828; border: 1px solid #ffcdd2; }
    .btn-primary { background: #1caded; color: #fff; padding: 8px 16px; font-size: 13px; &:disabled { opacity: .5; } }
    .btn-cancel { background: #f0f0f0; color: #555; padding: 8px 16px; font-size: 13px; }

    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px;
    }
    .modal { background: #fff; border-radius: 14px; padding: 24px; width: 100%; max-width: 480px; }
    .modal__title { margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #1a1a1a; }
    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    .field label { font-size: 12px; color: #666; }
    .field input, .field select {
      padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px;
      font-size: 14px; outline: none;
      &:focus { border-color: #1caded; }
    }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .modal__actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px; }

    .state { padding: 32px; text-align: center; color: #999; }
  `,
})
export class UsersPageComponent {
  protected readonly facade = inject(AdminFacade);
  private readonly fb = inject(FormBuilder);

  protected readonly editing = signal<User | null>(null);
  protected readonly isNew = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    position: ['', Validators.required],
    role: ['employee' as 'employee' | 'admin', Validators.required],
    password: ['', Validators.required],
    coins: [0, Validators.required],
    xp: [0, Validators.required],
  });

  constructor() {
    this.facade.init();
  }

  protected initials(name: string): string {
    return name.trim().split(' ').slice(0, 2).map((p) => p[0] ?? '').join('').toUpperCase();
  }

  protected openCreate(): void {
    this.form.reset({ name: '', email: '', position: '', role: 'employee', password: '', coins: 0, xp: 0 });
    this.isNew.set(true);
    this.editing.set({} as User);
  }

  protected openEdit(u: User): void {
    this.form.reset({
      name: u.name,
      email: u.email,
      position: u.position,
      role: u.role,
      password: u.password ?? '',
      coins: u.coins,
      xp: u.xp,
    });
    this.isNew.set(false);
    this.editing.set(u);
  }

  protected close(): void {
    this.editing.set(null);
  }

  protected save(): void {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue();
    if (this.isNew()) {
      this.facade.createUser({ ...payload, avatar: '' });
    } else {
      const u = this.editing();
      if (u) this.facade.updateUser(u.id, payload);
    }
    this.close();
  }

  protected onDelete(u: User): void {
    if (confirm(`Удалить сотрудника «${u.name}»?`)) {
      this.facade.deleteUser(u.id);
    }
  }
}
