// React ThemeProvider, context, and hook for runtime theme switching.

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeContextManager, ThemeContextValue, injectThemeTransition } from '@ribble-ui/core';

// Types
export type ThemeProviderProps<T> = {
  themes: Record<string, T>;
  initialTheme: string;
  children: React.ReactNode;
};

// Context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider<T>({ themes, initialTheme, children }: ThemeProviderProps<T>) {
  const [manager] = useState(() => new ThemeContextManager<T>(themes, initialTheme));
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsub = manager.subscribe(() => {
      injectThemeTransition(); // Smooth transition on theme change
      setVersion((v) => v + 1);
    });
    return unsub;
  }, [manager]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: manager.theme,
      setTheme: manager.setTheme.bind(manager),
      switchTheme: manager.switchTheme.bind(manager),
      availableThemes: manager.availableThemes,
      currentThemeName: manager.currentThemeName,
    }),
    [manager, manager.theme, manager.currentThemeName],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme<T>() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx as ThemeContextValue<T>;
}

export { ThemeContext };
