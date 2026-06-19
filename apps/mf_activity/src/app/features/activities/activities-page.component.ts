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
    .page {
      display: flex;
      flex-direction: column;
      gap: 22px;
      animation: page-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .page__header {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 26px 28px;
      border-radius: 20px;
      color: #fff;
      background:
        radial-gradient(90% 140% at 0% 0%, rgba(28, 173, 237, 0.95), transparent 58%),
        radial-gradient(80% 150% at 100% 0%, rgba(67, 56, 202, 0.9), transparent 55%),
        linear-gradient(120deg, #1caded 0%, #2563eb 50%, #4338ca 100%);
      box-shadow: 0 16px 40px -18px rgba(37, 99, 235, 0.55);
    }
    .page__title { margin: 0; font-size: 24px; font-weight: 750; letter-spacing: -0.5px; }
    .page__subtitle { margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.85); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
    .state { color: #94a3b8; text-align: center; padding: 48px; }

    @keyframes page-rise {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) { .page { animation: none; } }
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
