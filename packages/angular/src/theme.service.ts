import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeContextManager } from '@ui-kit/core/src/themes/themeContext';
import { getStoredTheme, setStoredTheme } from '@ui-kit/core/src/themes/themePersistence';

@Injectable({ providedIn: 'root' })
export class ThemeService<T = any> {
  private manager: ThemeContextManager<T>;
  private theme$ = new BehaviorSubject<T | null>(null);
  private themeName$ = new BehaviorSubject<string>('');
  private storageKey = 'ui-kit-theme';

  init(themes: Record<string, T>, initialTheme: string) {
    // Try to load persisted theme name
    const persisted = getStoredTheme(this.storageKey);
    const startTheme = persisted && themes[persisted] ? persisted : initialTheme;
    this.manager = new ThemeContextManager<T>(themes, startTheme);
    this.theme$.next(this.manager.theme);
    this.themeName$.next(this.manager.currentThemeName);
    this.manager.subscribe((theme, name) => {
      this.theme$.next(theme);
      this.themeName$.next(name);
      setStoredTheme(this.storageKey, name);
    });
  }

  get theme() {
    return this.theme$.asObservable();
  }

  get themeName() {
    return this.themeName$.asObservable();
  }

  setTheme(theme: T) {
    this.manager.setTheme(theme);
  }

  switchTheme(name: string) {
    this.manager.switchTheme(name);
  }

  get availableThemes() {
    return this.manager.availableThemes;
  }
}
