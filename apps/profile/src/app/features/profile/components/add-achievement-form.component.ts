import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Achievement } from 'shared-models';

export interface AchievementSubmit {
  achievementId: string;
  comment: string;
}

@Component({
  selector: 'app-add-achievement-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-wrap">
      <h4 class="form-wrap__title">Подать заявку на достижение</h4>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="field">
          <label>Достижение</label>
          <select formControlName="achievementId">
            <option value="" disabled>Выберите достижение</option>
            @for (a of achievements(); track a.id) {
              <option [value]="a.id">{{ a.icon }} {{ a.title }} — 🪙{{ a.coinsReward }} / ⭐{{ a.xpReward }} XP</option>
            }
          </select>
        </div>
        <div class="field">
          <label>Комментарий</label>
          <textarea formControlName="comment" rows="3" placeholder="Опишите достижение..."></textarea>
        </div>
        <div class="form-wrap__actions">
          <button type="submit" class="btn btn--primary" [disabled]="form.invalid">Отправить</button>
          <button type="button" class="btn btn--cancel" (click)="cancel.emit()">Отмена</button>
        </div>
      </form>
    </div>
  `,
  styles: `
    .form-wrap {
      padding: 18px; background: #fffbf5; border-radius: 14px; border: 1px solid #fde9cf;
      animation: form-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .form-wrap__title { margin: 0 0 16px; font-size: 14px; font-weight: 700; color: #0f172a; }
    .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .field label { font-size: 12px; font-weight: 600; color: #475569; }
    select, textarea {
      padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px;
      outline: none; font-family: inherit; background: #fff; color: #0f172a;
      transition: border-color 0.18s, box-shadow 0.18s;
      &:focus { border-color: #ea580c; box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.12); }
    }
    textarea { resize: vertical; }
    .form-wrap__actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px; }
    .btn {
      padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; border: none;
      transition: transform 0.12s, box-shadow 0.18s, background 0.18s;
    }
    .btn--primary {
      background: #ea580c; color: #fff; box-shadow: 0 6px 14px -6px rgba(234, 88, 12, 0.6);
      &:hover:not(:disabled) { transform: translateY(-1px); }
      &:disabled { opacity: .5; cursor: not-allowed; box-shadow: none; }
    }
    .btn--cancel { background: #fff; color: #475569; border: 1px solid #e2e8f0; &:hover { background: #f8fafc; } }
    @keyframes form-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  `,
})
export class AddAchievementFormComponent {
  public readonly achievements = input<Achievement[]>([]);
  public readonly submit$ = output<AchievementSubmit>();
  public readonly cancel = output<void>();

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    achievementId: ['', Validators.required],
    comment: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) return;
    this.submit$.emit(this.form.getRawValue());
    this.form.reset();
  }
}
