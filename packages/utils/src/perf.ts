// Performance monitoring hooks
export function measure<T>(label: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  // eslint-disable-next-line no-console
  console.log(`[UI Kit Perf] ${label}: ${(end - start).toFixed(2)}ms`);
  return result;
}
