// Angular service for Web Component enhancement and RxJS integration.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebComponentService {
  private state$ = new BehaviorSubject<any>(null);
  setState(val: any) {
    this.state$.next(val);
  }
  getState(): Observable<any> {
    return this.state$.asObservable();
  }
}
