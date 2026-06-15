import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from './auth.model';

/**
 * Защищает маршрут от неавторизованных пользователей.
 * При отказе перенаправляет на /login с сохранением целевого URL в returnUrl.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  return true;
};

/**
 * Фабрика гарда для проверки конкретной роли.
 * Неавторизованных отправляет на /login, авторизованных без нужной роли — на /.
 * @param role требуемая роль для доступа к маршруту
 * @example canActivate: [roleGuard('admin')]
 */
export function roleGuard(role: UserRole): CanActivateFn {
  return (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    if (!auth.hasRole(role)) {
      return router.createUrlTree(['/']);
    }

    return true;
  };
}
