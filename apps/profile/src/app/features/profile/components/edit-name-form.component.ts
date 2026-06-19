import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Dumb-компонент инлайн-редактирования имени */
@Component({
  selector: 'app-edit-name-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="edit-name">
      <input
        #nameInput
        class="edit-name__input"
        type="text"
        [value]="value()"
        placeholder="Имя Фамилия"
      />
      <div class="edit-name__actions">
        <button class="btn btn--save" type="button" (click)="save.emit(nameInput.value.trim())">
          Сохранить
        </button>
        <button class="btn btn--cancel" type="button" (click)="cancel.emit()">Отмена</button>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; width: 100%; }
    .edit-name { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 320px; margin-top: 12px; }
    .edit-name__input {
      padding: 9px 12px;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
      &:focus { border-color: #1caded; box-shadow: 0 0 0 4px rgba(28, 173, 237, 0.12); }
    }
    .edit-name__actions { display: flex; gap: 8px; }
    .btn {
      padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none;
      transition: transform 0.12s, background 0.18s;
      &:hover { transform: translateY(-1px); }
    }
    .btn--save { background: #1caded; color: #fff; box-shadow: 0 6px 14px -6px rgba(28, 173, 237, 0.6); }
    .btn--cancel { background: #fff; color: #475569; border: 1px solid #e2e8f0; }
  `,
})
export class EditNameFormComponent {
  public readonly value = input<string>('');
  public readonly save = output<string>();
  public readonly cancel = output<void>();
}
