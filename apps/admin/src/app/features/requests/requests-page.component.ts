import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AdminFacade } from '../../data/admin.facade';

@Component({
  selector: 'app-requests-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <h2 class="page__title">Заявки на рассмотрение</h2>

      <div class="tabs">
        <button class="tab" [class.tab--active]="tab() === 'activity'" (click)="tab.set('activity')">
          Активности
          @if (activityRequests().length) { <span class="tab__count">{{ activityRequests().length }}</span> }
        </button>
        <button class="tab" [class.tab--active]="tab() === 'achievement'" (click)="tab.set('achievement')">
          Достижения
          @if (achievementRequests().length) { <span class="tab__count">{{ achievementRequests().length }}</span> }
        </button>
      </div>

      @if (facade.loading()) {
        <p class="state">Загрузка...</p>
      } @else if (tab() === 'activity') {
        @if (activityRequests().length === 0) {
          <p class="state">Нет новых заявок на активности</p>
        }
        @for (req of activityRequests(); track req.id) {
          <div class="card">
            <div class="card__main">
              <div class="card__head">
                <strong>{{ req.user?.name }}</strong>
                <span class="card__sub">{{ req.user?.position }}</span>
              </div>
              <p class="card__title">{{ req.activity?.title }}</p>
              @if (req.comment) { <p class="card__comment">"{{ req.comment }}"</p> }
              <div class="card__rewards">
                <span class="reward reward--coins">+{{ req.activity?.coinsReward }} Bivcoins</span>
                <span class="reward reward--xp">+{{ req.activity?.xpReward }} XP</span>
              </div>
              <p class="card__date">{{ req.createdAt }}</p>
            </div>
            <div class="card__actions">
              <button class="btn btn--approve" (click)="facade.approveActivity(req)">Одобрить</button>
              <button class="btn btn--reject" (click)="facade.rejectActivity(req)">Отклонить</button>
            </div>
          </div>
        }
      } @else {
        @if (achievementRequests().length === 0) {
          <p class="state">Нет новых заявок на достижения</p>
        }
        @for (req of achievementRequests(); track req.id) {
          <div class="card">
            <div class="card__main">
              <div class="card__head">
                <strong>{{ req.user?.name }}</strong>
                <span class="card__sub">{{ req.user?.position }}</span>
              </div>
              <p class="card__title">{{ req.achievement?.title }}</p>
              @if (req.comment) { <p class="card__comment">"{{ req.comment }}"</p> }
              <div class="card__rewards">
                <span class="reward reward--coins">+{{ req.achievement?.coinsReward }} Bivcoins</span>
                <span class="reward reward--xp">+{{ req.achievement?.xpReward }} XP</span>
              </div>
              <p class="card__date">{{ req.createdAt }}</p>
            </div>
            <div class="card__actions">
              <button class="btn btn--approve" (click)="facade.approveAchievement(req)">Одобрить</button>
              <button class="btn btn--reject" (click)="facade.rejectAchievement(req)">Отклонить</button>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: 16px; }
    .page__title { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a; }

    .tabs { display: flex; gap: 8px; border-bottom: 1px solid #e0e0e0; }
    .tab {
      padding: 10px 16px; background: none; border: none; cursor: pointer;
      font-size: 14px; color: #888; font-weight: 500;
      border-bottom: 2px solid transparent; margin-bottom: -1px;
      display: flex; align-items: center; gap: 8px;
      &:hover { color: #1a1a1a; }
      &--active { color: #1caded; border-color: #1caded; }
    }
    .tab__count {
      background: #1caded; color: #fff; font-size: 11px; font-weight: 600;
      padding: 1px 7px; border-radius: 10px;
    }

    .card {
      display: flex; gap: 16px; background: #fff; padding: 16px;
      border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .card__main { flex: 1; display: flex; flex-direction: column; gap: 6px; }
    .card__head { display: flex; align-items: baseline; gap: 8px; }
    .card__head strong { font-size: 14px; color: #1a1a1a; }
    .card__sub { font-size: 12px; color: #999; }
    .card__title { margin: 0; font-size: 15px; font-weight: 600; color: #1a1a1a; }
    .card__comment { margin: 0; font-size: 13px; color: #555; font-style: italic; }
    .card__rewards { display: flex; gap: 8px; margin-top: 4px; }
    .reward { font-size: 12px; font-weight: 500; padding: 3px 10px; border-radius: 6px; }
    .reward--coins { background: #fff3e0; color: #c2720a; }
    .reward--xp    { background: #e3f2fd; color: #1d6fcf; }
    .card__date { margin: 0; font-size: 12px; color: #bbb; }

    .card__actions { display: flex; flex-direction: column; gap: 8px; }
    .btn {
      padding: 7px 18px; border-radius: 6px; border: none;
      font-size: 13px; font-weight: 500; cursor: pointer;
    }
    .btn--approve { background: #2e7d32; color: #fff; &:hover { background: #266b29; } }
    .btn--reject  { background: #fff; color: #c62828; border: 1px solid #ffcdd2; &:hover { background: #fff5f5; } }

    .state { padding: 32px; text-align: center; color: #999; }
  `,
})
export class RequestsPageComponent {
  protected readonly facade = inject(AdminFacade);
  protected readonly tab = signal<'activity' | 'achievement'>('activity');

  protected readonly activityRequests = computed(() => this.facade.getActivityRequests());
  protected readonly achievementRequests = computed(() => this.facade.getAchievementRequests());

  constructor() {
    this.facade.init();
  }
}
