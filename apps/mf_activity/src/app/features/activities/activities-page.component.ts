import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from 'shared-models';
import { ActivityCardComponent } from './components/activity-card.component';

const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-activities-page',
  imports: [ActivityCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Активности</h2>
        <p class="page__subtitle">Участвуйте в активностях и зарабатывайте Bivcoins и XP</p>
      </div>

      @if (loading()) {
        <p class="state">Загрузка...</p>
      } @else {
        <div class="grid">
          @for (item of activities(); track item.id) {
            <app-activity-card [activity]="item" />
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
export class ActivitiesPageComponent {
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(true);
  protected readonly activities = signal<Activity[]>([]);

  constructor() {
    this.http.get<Activity[]>(`${API_URL}/activities`).subscribe((list) => {
      this.activities.set(list);
      this.loading.set(false);
    });
  }
}
