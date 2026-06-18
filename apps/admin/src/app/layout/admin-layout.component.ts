import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar__title">Админ-панель</div>
        <nav class="sidebar__nav">
          <a routerLink="/admin/requests" routerLinkActive="active">
            <span class="sidebar__icon">📋</span> Заявки
          </a>
          <a routerLink="/admin/grant" routerLinkActive="active">
            <span class="sidebar__icon">🏅</span> Выдать достижение
          </a>
          <a routerLink="/admin/orders" routerLinkActive="active">
            <span class="sidebar__icon">🛒</span> Заказы
          </a>
          <a routerLink="/admin/users" routerLinkActive="active">
            <span class="sidebar__icon">👥</span> Сотрудники
          </a>
          <a routerLink="/admin/products" routerLinkActive="active">
            <span class="sidebar__icon">📦</span> Товары
          </a>
        </nav>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: start; }
    .sidebar {
      background: #fff; border-radius: 12px; padding: 16px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
      position: sticky; top: 20px;
    }
    .sidebar__title {
      font-size: 12px; font-weight: 600; text-transform: uppercase;
      color: #999; letter-spacing: .5px; padding: 4px 12px 12px;
    }
    .sidebar__nav { display: flex; flex-direction: column; gap: 2px; }
    .sidebar__nav a {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 8px;
      text-decoration: none; color: #555; font-size: 14px;
      transition: background .15s;
      &:hover { background: #f5f6fa; color: #1a1a1a; }
      &.active { background: #1caded; color: #fff; }
    }
    .sidebar__icon { font-size: 16px; }
    .content { min-width: 0; }
  `,
})
export class AdminLayoutComponent {}
