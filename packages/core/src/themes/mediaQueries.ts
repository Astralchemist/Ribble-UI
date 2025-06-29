// Print styles, media query, high contrast, reduced motion support.

/**
 * Returns CSS for high contrast mode, reduced motion, and print styles.
 */
export function getMediaQueryStyles(options: {
  highContrast?: string;
  reducedMotion?: string;
  print?: string;
}): string {
  let css = '';
  if (options.highContrast) {
    css += `@media (forced-colors: active) {\n${options.highContrast}\n}`;
  }
  if (options.reducedMotion) {
    css += `@media (prefers-reduced-motion: reduce) {\n${options.reducedMotion}\n}`;
  }
  if (options.print) {
    css += `@media print {\n${options.print}\n}`;
  }
  return css;
}

/**
 * Utility to detect if user prefers high contrast mode.
 */
export function isHighContrast(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(forced-colors: active)').matches
  );
}

/**
 * Utility to detect if user prefers reduced motion.
 */
export function isReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
