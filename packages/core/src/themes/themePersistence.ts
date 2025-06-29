// Theme persistence utilities (localStorage, SSR safety).

/**
 * Safely get a value from localStorage (SSR safe).
 */
export function getStoredTheme(key: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely set a value in localStorage (SSR safe).
 */
export function setStoredTheme(key: string, value: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

/**
 * Remove a value from localStorage (SSR safe).
 */
export function removeStoredTheme(key: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.removeItem(key);
  } catch {}
}
