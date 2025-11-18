/**
 * Lazy loading utilities for components
 */

export interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number | number[];
  placeholder?: string;
}

/**
 * Lazy load a component when it enters the viewport
 */
export function lazyLoadComponent(
  componentName: string,
  loader: () => Promise<any>,
  options: LazyLoadOptions = {}
): void {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    placeholder = 'Loading...',
  } = options;

  // Create custom element class
  class LazyComponent extends HTMLElement {
    private loaded = false;
    private observer: IntersectionObserver | null = null;

    connectedCallback() {
      // Show placeholder
      this.innerHTML = `<div class="lazy-placeholder">${placeholder}</div>`;

      // Create intersection observer
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.loaded) {
              this.loadComponent();
            }
          });
        },
        { rootMargin, threshold }
      );

      this.observer.observe(this);
    }

    disconnectedCallback() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }

    private async loadComponent() {
      this.loaded = true;

      try {
        // Load the actual component
        await loader();

        // Get original attributes
        const attrs = Array.from(this.attributes);

        // Create the actual component
        const actualComponent = document.createElement(componentName);

        // Copy attributes
        attrs.forEach((attr) => {
          if (attr.name !== 'is' && attr.name !== 'class') {
            actualComponent.setAttribute(attr.name, attr.value);
          }
        });

        // Copy children
        while (this.firstChild) {
          actualComponent.appendChild(this.firstChild);
        }

        // Replace placeholder with actual component
        this.parentNode?.replaceChild(actualComponent, this);
      } catch (error) {
        console.error(`Failed to lazy load component ${componentName}:`, error);
        this.innerHTML = '<div class="lazy-error">Failed to load component</div>';
      }
    }
  }

  // Register lazy component
  const lazyName = `lazy-${componentName}`;
  if (!customElements.get(lazyName)) {
    customElements.define(lazyName, LazyComponent);
  }
}

/**
 * Create a lazy-loadable component definition
 */
export function defineLazyComponent(
  name: string,
  importFn: () => Promise<any>
): void {
  lazyLoadComponent(name, importFn);
}

/**
 * Preload components for better performance
 */
export async function preloadComponents(
  components: Array<{ name: string; loader: () => Promise<any> }>
): Promise<void> {
  const promises = components.map(({ loader }) => loader());
  await Promise.all(promises);
}

/**
 * Lazy load on interaction (click, hover, etc.)
 */
export function lazyLoadOnInteraction(
  element: HTMLElement,
  loader: () => Promise<any>,
  eventType: string = 'click'
): void {
  let loaded = false;

  const loadHandler = async () => {
    if (loaded) return;
    loaded = true;

    await loader();
    element.removeEventListener(eventType, loadHandler);
  };

  element.addEventListener(eventType, loadHandler);
}

/**
 * Lazy load after idle time
 */
export function lazyLoadOnIdle(
  loader: () => Promise<any>,
  timeout: number = 200
): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        loader();
      },
      { timeout }
    );
  } else {
    setTimeout(() => {
      loader();
    }, timeout);
  }
}

/**
 * Code splitting helper for dynamic imports
 */
export async function loadComponentChunk<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  const module = await importFn();
  return module.default;
}

/**
 * Route-based code splitting
 */
export class ComponentRegistry {
  private components = new Map<string, () => Promise<any>>();
  private loaded = new Set<string>();

  register(name: string, loader: () => Promise<any>): void {
    this.components.set(name, loader);
  }

  async load(name: string): Promise<void> {
    if (this.loaded.has(name)) {
      return;
    }

    const loader = this.components.get(name);
    if (!loader) {
      throw new Error(`Component "${name}" not registered`);
    }

    await loader();
    this.loaded.set(name);
  }

  async loadAll(): Promise<void> {
    const loaders = Array.from(this.components.values());
    await Promise.all(loaders.map((loader) => loader()));
  }

  isLoaded(name: string): boolean {
    return this.loaded.has(name);
  }
}

// Global registry instance
export const componentRegistry = new ComponentRegistry();

/**
 * Example usage:
 *
 * // Register components
 * componentRegistry.register('ribble-button', () =>
 *   import('./components/Button/Button')
 * );
 *
 * // Load on demand
 * await componentRegistry.load('ribble-button');
 *
 * // Use lazy component
 * <lazy-ribble-button variant="primary">Click me</lazy-ribble-button>
 */
