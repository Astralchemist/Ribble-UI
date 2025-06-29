import React from 'react';
import { render, fireEvent } from '@testing-library/react';

/**
 * Utility to render a Web Component in React for testing.
 */
export function renderWebComponent(
  Component: React.ElementType,
  props: any = {},
  children?: React.ReactNode,
) {
  return render(<Component {...props}>{children}</Component>);
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
