// Theme hot reloading utility (dev only)

/**
 * Simple hot reload utility for theme changes in development.
 * Calls the provided callback when the theme file changes (if supported).
 *
 * Supports both Vite-style (`import.meta.hot`) and Webpack-style
 * (`module.hot`) HMR without pulling in vite/client or @types/node.
 */
export function enableThemeHotReload(callback: () => void) {
  const meta = import.meta as ImportMeta & { hot?: { accept: (cb: () => void) => void } };
  if (meta && meta.hot) {
    meta.hot.accept(callback);
    return;
  }
  const webpackModule = (globalThis as unknown as {
    module?: { hot?: { accept: (cb: () => void) => void } };
  }).module;
  if (webpackModule && webpackModule.hot) {
    webpackModule.hot.accept(callback);
  }
}
