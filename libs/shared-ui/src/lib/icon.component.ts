import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { ICONS } from './icons';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="icon" [innerHTML]="svg()"></span>`,
  styles: `
    .icon { display: flex; align-items: center; justify-content: center; }
    .icon ::ng-deep svg { width: 100%; height: 100%; }
  `,
})
export class IconComponent {
  public readonly name = input.required<string>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly svg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()] ?? ''),
  );
}
