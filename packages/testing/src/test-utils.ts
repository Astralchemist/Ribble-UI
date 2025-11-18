import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

export { screen, waitFor, within, userEvent };

/**
 * Test utilities for Web Components
 */

export interface RenderResult {
  container: HTMLElement;
  element: HTMLElement;
  rerender: (props: Record<string, any>) => void;
  unmount: () => void;
}

/**
 * Render a web component for testing
 */
export function renderWebComponent(
  tagName: string,
  props: Record<string, any> = {},
  options: { innerHTML?: string; slot?: string } = {}
): RenderResult {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const element = document.createElement(tagName) as any;

  // Set properties
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      // Event listener
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (typeof value === 'boolean') {
      // Boolean attribute
      if (value) {
        element.setAttribute(key, '');
      }
    } else if (value !== null && value !== undefined) {
      // Regular attribute or property
      element.setAttribute(key, String(value));
      element[key] = value;
    }
  });

  // Set inner content
  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  } else if (options.slot) {
    element.textContent = options.slot;
  }

  container.appendChild(element);

  return {
    container,
    element,
    rerender: (newProps: Record<string, any>) => {
      Object.entries(newProps).forEach(([key, value]) => {
        if (!key.startsWith('on')) {
          if (typeof value === 'boolean') {
            if (value) {
              element.setAttribute(key, '');
            } else {
              element.removeAttribute(key);
            }
          } else if (value !== null && value !== undefined) {
            element.setAttribute(key, String(value));
            element[key] = value;
          }
        }
      });
    },
    unmount: () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    },
  };
}

/**
 * Wait for a web component to be defined
 */
export async function waitForComponent(tagName: string): Promise<void> {
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }
  return customElements.whenDefined(tagName);
}

/**
 * Get the shadow root of an element
 */
export function getShadowRoot(element: HTMLElement): ShadowRoot | null {
  return element.shadowRoot;
}

/**
 * Query inside shadow DOM
 */
export function queryShadow(
  element: HTMLElement,
  selector: string
): HTMLElement | null {
  const shadowRoot = getShadowRoot(element);
  return shadowRoot ? shadowRoot.querySelector(selector) : null;
}

/**
 * Query all inside shadow DOM
 */
export function queryShadowAll(
  element: HTMLElement,
  selector: string
): NodeListOf<Element> | [] {
  const shadowRoot = getShadowRoot(element);
  return shadowRoot ? shadowRoot.querySelectorAll(selector) : [];
}

/**
 * Fire a custom event on an element
 */
export function fireCustomEvent(
  element: HTMLElement,
  eventName: string,
  detail?: any
): void {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    composed: true,
  });
  element.dispatchEvent(event);
}

/**
 * Wait for an element to be in the document
 */
export async function waitForElement(
  selector: string,
  options: { timeout?: number; container?: HTMLElement } = {}
): Promise<HTMLElement> {
  const { timeout = 1000, container = document.body } = options;

  return waitFor(
    () => {
      const element = container.querySelector(selector);
      if (!element) {
        throw new Error(`Element "${selector}" not found`);
      }
      return element as HTMLElement;
    },
    { timeout }
  );
}

/**
 * Simulate accessibility keyboard navigation
 */
export async function pressKey(key: string, element?: HTMLElement): Promise<void> {
  const target = element || document.activeElement || document.body;
  await userEvent.keyboard(`{${key}}`);
}

/**
 * Test helper to check ARIA attributes
 */
export function expectAriaLabel(element: HTMLElement, label: string): void {
  expect(element.getAttribute('aria-label')).toBe(label);
}

export function expectAriaRole(element: HTMLElement, role: string): void {
  expect(element.getAttribute('role')).toBe(role);
}

/**
 * Test helper for focus management
 */
export function expectFocused(element: HTMLElement): void {
  expect(document.activeElement).toBe(element);
}

/**
 * Mock component registration for testing
 */
export function mockCustomElement(tagName: string, implementation: any): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, implementation);
  }
}

/**
 * Create a spy for component events
 */
export function createEventSpy(element: HTMLElement, eventName: string): jest.Mock {
  const spy = vi.fn();
  element.addEventListener(eventName, spy);
  return spy as any;
}

/**
 * Accessibility testing helper
 */
export async function testA11y(element: HTMLElement): Promise<void> {
  // Basic accessibility checks
  const interactiveElements = element.querySelectorAll(
    'button, a, input, select, textarea, [tabindex]'
  );

  interactiveElements.forEach((el) => {
    // Check for accessible name
    const hasAccessibleName =
      el.hasAttribute('aria-label') ||
      el.hasAttribute('aria-labelledby') ||
      el.textContent?.trim() ||
      (el as HTMLInputElement).labels?.length;

    if (!hasAccessibleName) {
      console.warn('Interactive element missing accessible name:', el);
    }
  });
}
