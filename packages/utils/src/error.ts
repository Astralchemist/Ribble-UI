// Error handling and logging utilities
export function logError(err: any, context?: string) {
  // eslint-disable-next-line no-console
  console.error(`[UI Kit Error]${context ? ' [' + context + ']' : ''}:`, err);
}
export function tryCatch<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}
