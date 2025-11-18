// Vue provide/inject composable for runtime theme switching.
import { inject, provide, reactive } from 'vue';
import { ThemeContextManager } from '@ui-kit/core/src/themes/themeContext';
import { injectThemeTransition } from '@ui-kit/core/src/themes/globalStyles';

const THEME_KEY = Symbol('ThemeContext');

export function provideTheme<T>(themes: Record<string, T>, initialTheme: string) {
  const manager = reactive(new ThemeContextManager<T>(themes, initialTheme));
  manager.subscribe(() => {
    injectThemeTransition(); // Smooth transition on theme change
  });
  provide(THEME_KEY, manager);
  return manager;
}

export function useTheme<T>(): ThemeContextManager<T> {
  const manager = inject<ThemeContextManager<T>>(THEME_KEY);
  if (!manager) throw new Error('useTheme must be used within a theme provider');
  return manager;
}
