// Angular Material theme integration helpers for Web Components.

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebComponentMaterialService {
  /**
   * Apply Angular Material theme CSS vars to a Web Component
   */
  applyTheme(el: HTMLElement, themeVars: Record<string, string>) {
    Object.entries(themeVars).forEach(([k, v]) => {
      el.style.setProperty(k, v);
    });
  }
}
