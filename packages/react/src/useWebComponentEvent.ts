import { useEffect } from 'react';

/**
 * Custom React hook for subscribing to a Web Component event.
 * @param ref - React ref to the Web Component
 * @param event - Event name (e.g. 'change')
 * @param handler - Event handler function
 */
export function useWebComponentEvent<T extends HTMLElement>(
  ref: React.RefObject<T>,
  event: string,
  handler: (e: Event) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener(event, handler);
    return () => el.removeEventListener(event, handler);
  }, [ref, event, handler]);
}
