// Angular Router integration helpers for Web Components.

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebComponentRouterService {
  constructor(private router: Router) {}
  navigate(to: string) {
    this.router.navigate([to]);
  }
}
