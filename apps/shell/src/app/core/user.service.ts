import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { User } from 'shared-models';
import { AuthService } from '../auth/auth.service';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  /**
   * Реактивно загружает профиль из API при каждой смене auth-состояния.
   * Обнуляется автоматически при выходе.
   */
  public readonly user = toSignal(
    toObservable(this.auth.user).pipe(
      switchMap((authUser) => {
        if (!authUser) return of(null);
        return this.http
          .get<User[]>(`${API_URL}/users`, { params: { email: authUser.email } })
          .pipe(map((users) => users[0] ?? null));
      }),
    ),
    { initialValue: null },
  );
}
