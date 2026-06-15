import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthUser } from '../auth/auth.model';

/** Dumb-компонент навбара — только отображение, никакой бизнес-логики */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /** Данные текущего пользователя, null если не авторизован */
  public readonly user = input<AuthUser | null>(null);

  /** Событие выхода — обработку делегируем родителю */
  public readonly logout = output<void>();
}
