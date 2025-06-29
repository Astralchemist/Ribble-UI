// Svelte custom actions for component enhancement (e.g., theme, animation).
import { writable, type Writable } from 'svelte/store';

/**
 * Svelte action for two-way binding and event forwarding on Web Components.
 * Usage: <my-element use:webComponentBind={{ value, onInput, props }} />
 */
export function webComponentBind(
  node: HTMLElement,
  options: {
    value?: any;
    onInput?: (e: Event) => void;
    props?: Record<string, any>;
    events?: Record<string, (e: Event) => void>;
  } = {},
) {
  // Set initial value
  if (options.value !== undefined) {
    (node as any).value = options.value;
  }
  // Set initial props
  if (options.props) {
    Object.entries(options.props).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        node.setAttribute(k, v.toString());
      } else {
        node.removeAttribute(k);
      }
    });
  }
  // Listen for input event for two-way binding
  function handleInput(e: Event) {
    if (options.onInput) options.onInput(e);
  }
  node.addEventListener('input', handleInput);
  // Forward custom events
  const off: Array<() => void> = [];
  if (options.events) {
    Object.entries(options.events).forEach(([event, handler]) => {
      node.addEventListener(event, handler);
      off.push(() => node.removeEventListener(event, handler));
    });
  }
  return {
    update(newOptions: typeof options) {
      if (newOptions.value !== undefined) {
        (node as any).value = newOptions.value;
      }
      if (newOptions.props) {
        Object.entries(newOptions.props).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            node.setAttribute(k, v.toString());
          } else {
            node.removeAttribute(k);
          }
        });
      }
    },
    destroy() {
      node.removeEventListener('input', handleInput);
      off.forEach((fn) => fn());
    },
  };
}

/**
 * Svelte store helper for two-way binding with a Web Component's value property.
 * Usage: const valueStore = webComponentValueStore();
 * <my-element use:webComponentBind={{ value: $valueStore, onInput: e => valueStore.set(e.target.value) }} />
 */
export function webComponentValueStore<T = any>(initial: T = undefined as any): Writable<T> {
  return writable<T>(initial);
}

/**
 * Svelte action for integrating transitions/animations on Web Components.
 * Usage: <my-element use:webComponentAnimate={{ enter: 'fade-in', leave: 'fade-out' }} />
 */
export function webComponentAnimate(
  node: HTMLElement,
  options: { enter?: string; leave?: string } = {},
) {
  if (options.enter) node.classList.add(options.enter);
  return {
    destroy() {
      if (options.leave) node.classList.add(options.leave);
    },
  };
}

// SvelteKit SSR compatibility notes:
// - Web Components are only hydrated on the client, so avoid direct DOM access in module scope.
// - Use actions and stores inside onMount or reactive blocks to ensure client-only execution.
// - For SSR, wrap Web Components in <ClientOnly> or use the svelte:head tag for polyfills if needed.
// Example:
// <ClientOnly><my-element ... /></ClientOnly>
