import { mount } from '@vue/test-utils';

/**
 * Utility to mount a Web Component in Vue for testing.
 */
export function mountWebComponent(Component: any, options: any = {}) {
  return mount(Component, options);
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
