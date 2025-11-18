import { render } from '@testing-library/svelte';

/**
 * Utility to render a Web Component in Svelte for testing.
 */
export function renderWebComponent(Component: any, props: any = {}, options: any = {}) {
  return render(Component, { props, ...options });
}

/**
 * Utility to mock a Web Component for testing.
 */
export function mockWebComponent(tag: string, proto: Record<string, any> = {}) {
  class Mock extends HTMLElement {
    constructor() {
      super();
      Object.assign(this, proto);
    }
  }
  customElements.define(tag, Mock);
}

/**
 * Utility to fire a native event on a Web Component.
 */
export function fireWebComponentEvent(el: HTMLElement, event: string, detail?: any) {
  const evt = new CustomEvent(event, { detail, bubbles: true, composed: true });
  el.dispatchEvent(evt);
}
