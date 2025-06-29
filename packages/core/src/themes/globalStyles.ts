// Global CSS injection for Web Components and global styles.

/**
 * Inject global CSS into the document or a target root (e.g., shadowRoot).
 */
export function injectGlobalStyles(css: string, target: Document | ShadowRoot = document): void {
  if (!css || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-ui-kit-global', '');
  style.textContent = css;
  if ('head' in target && target.head) {
    target.head.appendChild(style);
  } else {
    target.appendChild(style);
  }
}

/**
 * Generate CSS custom properties from a theme object.
 */
export function themeToCSSVars(theme: Record<string, any>, prefix = '--ui'): string {
  const toVars = (obj: Record<string, any>, path: string[] = []): string =>
    Object.entries(obj)
      .map(([key, value]) => {
        const varName = `${prefix}-${[...path, key].join('-')}`;
        if (typeof value === 'object' && value !== null) {
          return toVars(value, [...path, key]);
        }
        return `${varName}: ${value};`;
      })
      .join('\n');
  return `:root {\n${toVars(theme)}\n}`;
}

/**
 * Injects a smooth transition for CSS custom properties on the target element.
 * Call this before or after theme switch for smooth transitions.
 */
export function injectThemeTransition(
  target: HTMLElement | Document = document.documentElement,
  duration = 300,
) {
  const el = target instanceof Document ? target.documentElement : target;
  el.style.transition = `color ${duration}ms, background-color ${duration}ms, border-color ${duration}ms, box-shadow ${duration}ms, fill ${duration}ms, stroke ${duration}ms, filter ${duration}ms, outline-color ${duration}ms, text-decoration-color ${duration}ms, opacity ${duration}ms, var(--*) ${duration}ms`;
  // Remove transition after duration to avoid interfering with other transitions
  setTimeout(() => {
    el.style.transition = '';
  }, duration + 50);
}
