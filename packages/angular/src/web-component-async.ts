// RxJS helpers for async operations with Web Components.

import { fromEvent, Observable } from 'rxjs';

/**
 * Helper to create an RxJS Observable from a Web Component event.
 */
export function fromWebComponentEvent<T extends Event = Event>(
  el: HTMLElement,
  event: string,
): Observable<T> {
  return fromEvent<T>(el, event);
}
