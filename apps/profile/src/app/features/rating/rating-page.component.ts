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
    .rating-page {
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: rating-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .rating-page__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 26px;
      border-radius: 20px;
      color: #fff;
      background:
        radial-gradient(90% 140% at 0% 0%, rgba(28, 173, 237, 0.95), transparent 58%),
        radial-gradient(80% 150% at 100% 0%, rgba(67, 56, 202, 0.9), transparent 55%),
        linear-gradient(120deg, #1caded 0%, #2563eb 50%, #4338ca 100%);
      box-shadow: 0 16px 40px -18px rgba(37, 99, 235, 0.55);
    }
    .rating-page__title { margin: 0; font-size: 22px; font-weight: 750; letter-spacing: -0.5px; }
    .rating-page__subtitle { margin: 5px 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.82); }

    .btn-back {
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      padding: 8px 16px;
      border: 1px solid rgba(255, 255, 255, 0.45);
      border-radius: 10px;
      white-space: nowrap;
      transition: background 0.15s;
      &:hover { background: rgba(255, 255, 255, 0.15); }
    }

    .my-rank {
      padding: 14px 18px;
      background: rgba(28, 173, 237, 0.08);
      border: 1px solid rgba(28, 173, 237, 0.2);
      border-radius: 14px;
      font-size: 14px;
      color: #0f172a;
      strong { font-size: 18px; color: #1180b3; margin-left: 2px; }
    }

    .list { display: flex; flex-direction: column; gap: 8px; }
    .state { color: #94a3b8; text-align: center; padding: 40px; }

    @keyframes rating-rise {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) { .rating-page { animation: none; } }
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
