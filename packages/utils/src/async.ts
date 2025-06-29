// Async component loading system
export function loadComponent<T = any>(importer: () => Promise<T>): Promise<T> {
  return importer();
}
