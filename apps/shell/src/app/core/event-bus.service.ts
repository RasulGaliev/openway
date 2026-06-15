import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { AppEvent } from './event-bus.model';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly events = new Subject<AppEvent>();

  /** Поток всех событий шины — для случаев когда нужно слушать несколько типов сразу */
  readonly events$ = this.events.asObservable();

  /**
   * Публикует событие во все активные подписки.
   * @param event типизированное событие из AppEvent (тип + данные)
   * @example bus.emit({ type: 'BALANCE_UPDATED', payload: { userId: '1', balance: 500 } })
   */
  emit(event: AppEvent): void {
    this.events.next(event);
  }

  /**
   * Подписка на конкретный тип события. Данные автоматически сужаются до нужного типа.
   * Предпочтительный способ подписки вместо ручной фильтрации events$.
   * @param type один из типов AppEvent
   * @example bus.on('POINTS_EARNED').subscribe(({ payload }) => console.log(payload.amount))
   */
  on<T extends AppEvent['type']>(type: T): Observable<Extract<AppEvent, { type: T }>> {
    return this.events.pipe(
      filter((e): e is Extract<AppEvent, { type: T }> => e.type === type),
    );
  }
}
