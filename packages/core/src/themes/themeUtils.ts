// Theme composition, merging, and utility functions will go here.

/**
 * Deep merge two theme objects, with support for arrays and nested objects.
 * Later themes override earlier ones.
 */
export function mergeThemes<T extends Record<string, any>>(base: T, override: Partial<T>): T {
  if (!base) return override as T;
  if (!override) return base;
  const result: Record<string, any> = { ...base };
  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = mergeThemes(base[key], override[key]);
    } else if (override[key] !== undefined) {
      result[key] = override[key];
    }
  }
  return result as T;
}

/**
 * Compose multiple themes into one, applying them in order (left to right).
 * Accepts Partial<T> and returns a merged T.
 */
export function composeThemes<T extends Record<string, any>>(...themes: Array<Partial<T>>): T {
  if (!themes.length) return {} as T;
  let acc: Record<string, any> = { ...themes[0] };
  for (let i = 1; i < themes.length; i++) {
    acc = mergeThemes(acc, themes[i]);
  }
  return acc as T;
}

/**
 * Shallow merge for theme overrides at the component level.
 */
export function overrideTheme<T extends Record<string, any>>(theme: T, override: Partial<T>): T {
  return { ...theme, ...override };
}
