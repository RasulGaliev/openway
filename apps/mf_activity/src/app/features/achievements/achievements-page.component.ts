import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Achievement } from 'shared-models';
import { AchievementCardComponent } from './components/achievement-card.component';

const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-achievements-page',
  imports: [AchievementCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Достижения</h2>
        <p class="page__subtitle">Выдаются администратором за особые заслуги</p>
      </div>

      @if (loading()) {
        <p class="state">Загрузка...</p>
      } @else {
        <div class="grid">
          @for (item of achievements(); track item.id) {
            <app-achievement-card [achievement]="item" />
          }
        </div>
      }
    </div>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; flex-direction: column; gap: 4px; }
    .page__title { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a; }
    .page__subtitle { margin: 0; font-size: 14px; color: #888; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .state { color: #999; text-align: center; padding: 48px; }
  `,
})
export class AchievementsPageComponent {
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(true);
  protected readonly achievements = signal<Achievement[]>([]);

  constructor() {
    this.http.get<Achievement[]>(`${API_URL}/achievements`).subscribe((list) => {
      this.achievements.set(list);
      this.loading.set(false);
    });
  }
}
