// Theme hot reloading utility (dev only)

/**
 * Simple hot reload utility for theme changes in development.
 * Calls the provided callback when the theme file changes (if supported).
 */
export function enableThemeHotReload(callback: () => void) {
  if (import.meta && import.meta.hot) {
    import.meta.hot.accept(callback);
  } else if ((module as any).hot) {
    (module as any).hot.accept(callback);
  }
}
