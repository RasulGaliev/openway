import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Перехватывает HTTP ошибки 401 и 403 глобально.
 * 401 — токен истёк или отсутствует: очищает сессию и редиректит на /login.
 * 403 — недостаточно прав: редиректит на главную страницу.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        auth.logout();
      }

      if (error.status === HttpStatusCode.Forbidden) {
        router.navigate(['/']);
      }

      return throwError(() => error);
    }),
  );
};
