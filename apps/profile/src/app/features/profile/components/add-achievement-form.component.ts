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
    .form-wrap { padding: 16px; background: #fff8f0; border-radius: 10px; border: 1px solid #ffe0b2; }
    .form-wrap__title { margin: 0 0 14px; font-size: 15px; font-weight: 600; color: #1a1a1a; }
    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    .field label { font-size: 13px; color: #555; }
    select, textarea {
      padding: 8px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;
      outline: none; font-family: inherit;
      &:focus { border-color: #e65100; }
    }
    textarea { resize: vertical; }
    .form-wrap__actions { display: flex; gap: 8px; justify-content: flex-end; }
    .btn { padding: 7px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; border: none; }
    .btn--primary { background: #e65100; color: #fff; &:disabled { opacity: .5; cursor: not-allowed; } }
    .btn--cancel { background: #f0f0f0; color: #555; }
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
