// Memory leak prevention utilities
export function autoCleanup(
  target: EventTarget,
  type: string,
  handler: EventListenerOrEventListenerObject,
) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
