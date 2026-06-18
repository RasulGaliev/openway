import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { RatingItemComponent, RatingUser } from './components/rating-item.component';

const API_URL = 'http://localhost:3000';

function getCurrentUserId(): string | null {
  const token = localStorage.getItem('openway_token');
  if (!token) return null;
  try {
    const raw = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = raw + '='.repeat((4 - (raw.length % 4)) % 4);
    return JSON.parse(atob(padded))?.sub ?? null;
  } catch { return null; }
}

@Component({
  selector: 'app-rating-page',
  imports: [RatingItemComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rating-page">
      <div class="rating-page__header">
        <div>
          <h2 class="rating-page__title">Рейтинг сотрудников</h2>
          <p class="rating-page__subtitle">По накопленному опыту (XP)</p>
        </div>
        <a class="btn-back" routerLink="/profile">← Профиль</a>
      </div>

      @if (loading()) {
        <p class="state">Загрузка...</p>
      } @else {
        @if (myRank()) {
          <div class="my-rank">
            Ваша позиция: <strong>#{{ myRank() }}</strong>
          </div>
        }

        <div class="list">
          @for (user of ranked(); track user.id; let i = $index) {
            <app-rating-item
              [user]="user"
              [rank]="i + 1"
              [isCurrent]="user.id === currentUserId"
            />
          }
        </div>
      }
    </div>
  `,
  styles: `
    .rating-page { display: flex; flex-direction: column; gap: 16px; }

    .rating-page__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .rating-page__title { margin: 0; font-size: 20px; font-weight: 700; color: #1a1a1a; }
    .rating-page__subtitle { margin: 4px 0 0; font-size: 13px; color: #999; }

    .btn-back {
      text-decoration: none;
      font-size: 13px;
      color: #1caded;
      padding: 6px 14px;
      border: 1px solid #1caded;
      border-radius: 6px;
      white-space: nowrap;
      &:hover { background: #f0f9ff; }
    }

    .my-rank {
      padding: 10px 16px;
      background: #f0f9ff;
      border-radius: 8px;
      font-size: 14px;
      color: #0369a1;
      strong { font-size: 16px; }
    }

    .list { display: flex; flex-direction: column; gap: 6px; }
    .state { color: #999; text-align: center; padding: 32px; }
  `,
})
export class RatingPageComponent {
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(true);
  protected readonly ranked = signal<RatingUser[]>([]);
  protected readonly currentUserId = getCurrentUserId();

  protected readonly myRank = computed(() => {
    const idx = this.ranked().findIndex((u) => u.id === this.currentUserId);
    return idx >= 0 ? idx + 1 : null;
  });

  constructor() {
    this.http.get<any[]>(`${API_URL}/users`).subscribe((users) => {
      const employees = users
        .filter((u) => u.role === 'employee')
        .map((u): RatingUser => ({
          id: u.id,
          name: u.name,
          position: u.position,
          xp: Number(u.xp),
          avatar: u.avatar,
          // coins намеренно не передаём
        }))
        .sort((a, b) => b.xp - a.xp);

      this.ranked.set(employees);
      this.loading.set(false);
    });
  }
}
