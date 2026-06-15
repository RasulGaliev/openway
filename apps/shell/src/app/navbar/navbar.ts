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
  public readonly user = input<AuthUser | null>(null);
  public readonly balance = input<number>(0);
  public readonly avatar = input<string>('');
  public readonly logout = output<void>();

  protected readonly initials = computed(() => {
    // initials вычисляются из email если нет имени
    const email = this.user()?.email ?? '';
    return email.slice(0, 2).toUpperCase();
  });
}
