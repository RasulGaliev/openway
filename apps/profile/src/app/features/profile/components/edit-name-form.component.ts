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
    .edit-name { display: flex; flex-direction: column; gap: 8px; width: 100%; }
    .edit-name__input {
      padding: 6px 10px;
      border: 1px solid #1caded;
      border-radius: 6px;
      font-size: 15px;
      outline: none;
      text-align: center;
    }
    .edit-name__actions { display: flex; gap: 8px; justify-content: center; }
    .btn { padding: 5px 14px; border-radius: 5px; font-size: 13px; cursor: pointer; border: none; }
    .btn--save { background: #1caded; color: #fff; }
    .btn--cancel { background: #f0f0f0; color: #555; }
  `,
})
export class EditNameFormComponent {
  public readonly value = input<string>('');
  public readonly save = output<string>();
  public readonly cancel = output<void>();
}
