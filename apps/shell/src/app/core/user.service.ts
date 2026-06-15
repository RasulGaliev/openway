import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { User } from 'shared-models';
import { AuthService } from '../auth/auth.service';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  /**
   * Реактивно загружает профиль из API при каждой смене auth-состояния.
   * Использует /users/:id — json-server v1 не поддерживает фильтр ?id=
   */
  public readonly user = toSignal(
    toObservable(this.auth.user).pipe(
      switchMap((authUser) => {
        if (!authUser) return of(null);
        return this.http.get<User>(`${API_URL}/users/${authUser.sub}`);
      }),
    ),
    { initialValue: null },
  );
}
