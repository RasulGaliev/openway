import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
  /** Данные текущего пользователя из JWT, null если не авторизован */
  public readonly user = input<AuthUser | null>(null);

  /** Полное имя пользователя из профиля */
  public readonly name = input<string>('');

  /** Текущий баланс баллов */
  public readonly balance = input<number>(0);

  /** Событие выхода — обработку делегируем родителю */
  public readonly logout = output<void>();

  /** Инициалы для аватара — первые буквы имени и фамилии */
  protected readonly initials = computed(() => {
    const parts = this.name().trim().split(' ');
    return parts
      .slice(0, 2)
      .map((p) => p[0] ?? '')
      .join('')
      .toUpperCase();
  });
}
