/** @jsxImportSource react */
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useContext } from 'react';
import { ThemeContext, useTheme } from './ThemeProvider';

// Utility: map React props to Web Component attributes
function setAttributes(el: HTMLElement, props: Record<string, any>) {
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value.toString());
    }
  });
}

// Utility: map React event props (onEvent) to native events
function addEventListeners(el: HTMLElement, props: Record<string, any>) {
  const listeners: Array<() => void> = [];
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, value as EventListener);
      listeners.push(() => el.removeEventListener(event, value as EventListener));
    }
  });
  return () => listeners.forEach((off) => off());
}

// Main HOC
export function withWebComponent<T extends object = any>(
  tagName: string,
  propNames: string[] = [],
  eventNames: string[] = [],
) {
  type Props = T & React.HTMLAttributes<HTMLElement>;
  const Component = forwardRef<HTMLElement, Props>((props, ref) => {
    const innerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLElement);
    const theme = useContext(ThemeContext);

    // Set attributes and event listeners
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      setAttributes(el, Object.fromEntries(propNames.map((k) => [k, (props as any)[k]])));
      const off = addEventListeners(el, props);
      return off;
    }, [props]);

    // Theming: apply theme as attribute or CSS vars
    useEffect(() => {
      const el = innerRef.current;
      if (!el || !theme || !theme.theme || typeof theme.theme !== 'object') return;
      Object.entries(theme.theme).forEach(([k, v]) => {
        el.style.setProperty(`--ui-${k}`, String(v));
      });
    }, [theme]);

    return React.createElement(tagName, {
      ref: innerRef,
      ...props,
      suppressHydrationWarning: true, // SSR compatibility
    });
  });
  Component.displayName = `withWebComponent(${tagName})`;
  return Component;
}

// Animation integration: allow passing an animation prop (e.g., Framer Motion)
// Usage: <MyComponent animation={motionProps} />
// This is a pass-through for animation libraries
