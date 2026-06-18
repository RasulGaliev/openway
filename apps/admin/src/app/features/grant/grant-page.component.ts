import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminFacade } from '../../data/admin.facade';

@Component({
  selector: 'app-grant-page',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <h2 class="page__title">Выдать достижение сотруднику</h2>
      <p class="page__subtitle">Создаёт запись со статусом «одобрено», награды начисляются сразу.</p>

      <form class="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="field">
          <label>Сотрудник</label>
          <select formControlName="userId">
            <option value="" disabled>Выберите сотрудника</option>
            @for (u of employees(); track u.id) {
              <option [value]="u.id">{{ u.name }} — {{ u.position }}</option>
            }
          </select>
        </div>

        <div class="field">
          <label>Достижение</label>
          <select formControlName="achievementId">
            <option value="" disabled>Выберите достижение</option>
            @for (a of facade.achievements(); track a.id) {
              <option [value]="a.id">{{ a.title }} — +{{ a.coinsReward }} Bivcoins / +{{ a.xpReward }} XP</option>
            }
          </select>
        </div>

        <div class="field">
          <label>Комментарий</label>
          <textarea formControlName="comment" rows="3" placeholder="За что выдано..."></textarea>
        </div>

        <button class="btn-submit" type="submit" [disabled]="form.invalid">Выдать</button>

        @if (success()) {
          <p class="success">✓ Достижение выдано</p>
        }
      </form>
    </div>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: 4px; max-width: 560px; }
    .page__title { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a; }
    .page__subtitle { margin: 0 0 16px; font-size: 14px; color: #888; }

    .form {
      background: #fff; padding: 24px; border-radius: 12px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
      display: flex; flex-direction: column; gap: 16px;
    }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field label { font-size: 13px; color: #555; }
    select, textarea {
      padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px;
      font-size: 14px; outline: none; font-family: inherit;
      &:focus { border-color: #1caded; }
    }
    textarea { resize: vertical; }
    .btn-submit {
      padding: 10px; background: #1caded; color: #fff;
      border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
      &:disabled { opacity: .5; cursor: not-allowed; }
      &:hover:not(:disabled) { background: #18a0dc; }
    }
    .success { margin: 0; font-size: 13px; color: #2e7d32; }
  `,
})
export class GrantPageComponent {
  protected readonly facade = inject(AdminFacade);
  private readonly fb = inject(FormBuilder);

  protected readonly employees = computed(() => this.facade.getEmployees());
  protected readonly success = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    achievementId: ['', Validators.required],
    comment: ['', Validators.required],
  });

  constructor() {
    this.facade.init();
  }

  protected submit(): void {
    if (this.form.invalid) return;
    const { userId, achievementId, comment } = this.form.getRawValue();
    this.facade.grantAchievement(userId, achievementId, comment);
    this.form.reset({ userId: '', achievementId: '', comment: '' });
    this.success.set(true);
    setTimeout(() => this.success.set(false), 2500);
  }
}
