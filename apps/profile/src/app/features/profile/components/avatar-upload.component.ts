import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Dumb-компонент загрузки аватара — читает файл через FileReader и эмитит base64 */
@Component({
  selector: 'app-avatar-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="avatar-wrap" (click)="fileInput.click()" title="Изменить фото">
      @if (avatar()) {
        <img class="avatar-img" [src]="avatar()" alt="Аватар" />
      } @else {
        <div class="avatar-initials">{{ initials() }}</div>
      }
      <div class="avatar-overlay">Изменить</div>
      <input #fileInput type="file" accept="image/*" hidden (change)="onFile($event)" />
    </div>
  `,
  styles: `
    .avatar-wrap {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .avatar-initials {
      width: 100%;
      height: 100%;
      background: #1caded;
      color: #fff;
      font-size: 28px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .avatar-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .avatar-wrap:hover .avatar-overlay { opacity: 1; }
  `,
})
export class AvatarUploadComponent {
  public readonly avatar = input<string>('');
  public readonly initials = input<string>('');
  public readonly avatarChange = output<string>();

  protected onFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 200;
        const ratio = Math.min(MAX / img.width, MAX / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.avatarChange.emit(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }
}
