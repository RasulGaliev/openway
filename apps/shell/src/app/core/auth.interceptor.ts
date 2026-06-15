import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TOKEN_KEY } from '../auth/auth.const';

/**
 * Добавляет JWT токен в заголовок Authorization каждого исходящего запроса.
 * Пропускает запрос без изменений если пользователь не авторизован.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
