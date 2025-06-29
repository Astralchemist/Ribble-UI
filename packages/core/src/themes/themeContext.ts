/**
 * Framework-agnostic theme context base for sharing theme state and switching logic.
 * Each framework adapter should use this for consistent theme management.
 */
export type ThemeContextValue<T = any> = {
  theme: T;
  setTheme: (theme: T) => void;
  switchTheme: (name: string) => void;
  availableThemes: Record<string, T>;
  currentThemeName: string;
};

export class ThemeContextManager<T = any> {
  private themes: Record<string, T> = {};
  private current: string;
  private listeners: Array<(theme: T, name: string) => void> = [];

  constructor(themes: Record<string, T>, initial: string) {
    this.themes = themes;
    this.current = initial;
  }

  get theme() {
    return this.themes[this.current];
  }

  get currentThemeName() {
    return this.current;
  }

  get availableThemes() {
    return this.themes;
  }

  setTheme(theme: T) {
    this.themes[this.current] = theme;
    this.notify();
  }

  switchTheme(name: string) {
    if (this.themes[name]) {
      this.current = name;
      this.notify();
    }
  }

  subscribe(listener: (theme: T, name: string) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    for (const l of this.listeners) l(this.theme, this.current);
  }
}
