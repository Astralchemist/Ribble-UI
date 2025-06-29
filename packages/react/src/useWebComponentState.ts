import { useState, useEffect } from 'react';

/**
 * Custom React hook for syncing state with a Web Component property.
 * @param ref - React ref to the Web Component
 * @param prop - Property name
 */
export function useWebComponentState<T extends HTMLElement, V = any>(
  ref: React.RefObject<T>,
  prop: string,
): [V | undefined, (v: V) => void] {
  const [value, setValue] = useState<V>();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setValue((el as any)[prop]);
    const handler = () => setValue((el as any)[prop]);
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
    return () => {
      el.removeEventListener('input', handler);
      el.removeEventListener('change', handler);
    };
  }, [ref, prop]);
  const set = (v: V) => {
    const el = ref.current;
    if (el) (el as any)[prop] = v;
    setValue(v);
  };
  return [value, set];
}
