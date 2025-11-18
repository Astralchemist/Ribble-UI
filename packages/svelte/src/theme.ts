// Svelte store and context for runtime theme switching.
import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import { ThemeContextManager } from '@ui-kit/core/src/themes/themeContext';
import { injectThemeTransition } from '@ui-kit/core/src/themes/globalStyles';

const THEME_KEY = Symbol('ThemeContext');

export function createThemeStore<T>(themes: Record<string, T>, initialTheme: string) {
  const manager = new ThemeContextManager<T>(themes, initialTheme);
  const { set } = writable({
    theme: manager.theme,
    currentThemeName: manager.currentThemeName,
    availableThemes: manager.availableThemes,
  });

  manager.subscribe((theme, name) => {
    injectThemeTransition(); // Smooth transition on theme change
    set({
      theme,
      currentThemeName: name,
      availableThemes: manager.availableThemes,
    });
  });

  setContext(THEME_KEY, manager);
  return manager;
}

export function useTheme<T>(): ThemeContextManager<T> {
  const manager = getContext<ThemeContextManager<T>>(THEME_KEY);
  if (!manager) throw new Error('useTheme must be used within a theme provider');
  return manager;
}
