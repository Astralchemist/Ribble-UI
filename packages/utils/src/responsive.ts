// Responsive design helpers
export function matchMediaQuery(query: string): boolean {
  return window.matchMedia(query).matches;
}
export function onMediaQuery(query: string, cb: (matches: boolean) => void): () => void {
  const mql = window.matchMedia(query);
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mql.addEventListener('change', handler);
  cb(mql.matches);
  return () => mql.removeEventListener('change', handler);
}
