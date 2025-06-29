import { useCallback } from 'react';

/**
 * Custom React hook for form field integration with Web Components.
 * Handles value/checked sync and custom validity.
 */
export function useFormField<T extends HTMLElement>(ref: React.RefObject<T>) {
  const setCustomValidity = useCallback(
    (msg: string) => {
      const el = ref.current;
      if (el && 'setCustomValidity' in el) {
        (el as any).setCustomValidity(msg);
      }
    },
    [ref],
  );
  return { setCustomValidity };
}
