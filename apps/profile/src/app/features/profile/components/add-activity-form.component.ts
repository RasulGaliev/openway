import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Activity } from 'shared-models';

export interface ActivitySubmit {
  activityId: string;
  comment: string;
}

@Component({
  selector: 'app-add-activity-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-wrap">
      <h4 class="form-wrap__title">Подать заявку на активность</h4>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="field">
          <label>Активность</label>
          <select formControlName="activityId">
            <option value="" disabled>Выберите активность</option>
            @for (a of activities(); track a.id) {
              <option [value]="a.id">{{ a.icon }} {{ a.title }} — 🪙{{ a.coinsReward }} / ⭐{{ a.xpReward }} XP</option>
            }
          </select>
        </div>
        <div class="field">
          <label>Комментарий</label>
          <textarea formControlName="comment" rows="3" placeholder="Опишите активность..."></textarea>
        </div>
        <div class="form-wrap__actions">
          <button type="submit" class="btn btn--primary" [disabled]="form.invalid">Отправить</button>
          <button type="button" class="btn btn--cancel" (click)="cancel.emit()">Отмена</button>
        </div>
      </form>
    </div>
  `,
  styles: `
    .form-wrap { padding: 16px; background: #f8f9ff; border-radius: 10px; border: 1px solid #e3e8ff; }
    .form-wrap__title { margin: 0 0 14px; font-size: 15px; font-weight: 600; color: #1a1a1a; }
    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    .field label { font-size: 13px; color: #555; }
    select, textarea {
      padding: 8px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;
      outline: none; font-family: inherit;
      &:focus { border-color: #1caded; }
    }
    textarea { resize: vertical; }
    .form-wrap__actions { display: flex; gap: 8px; justify-content: flex-end; }
    .btn { padding: 7px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; border: none; }
    .btn--primary { background: #1caded; color: #fff; &:disabled { opacity: .5; cursor: not-allowed; } }
    .btn--cancel { background: #f0f0f0; color: #555; }
  `,
})
export class AddActivityFormComponent {
  public readonly activities = input<Activity[]>([]);
  public readonly submit$ = output<ActivitySubmit>();
  public readonly cancel = output<void>();

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    activityId: ['', Validators.required],
    comment: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) return;
    this.submit$.emit(this.form.getRawValue());
    this.form.reset();
  }
}
