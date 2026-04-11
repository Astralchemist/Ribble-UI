import { UIComponent } from '../UIComponent';
import { property } from '../../types';

/**
 * Minimal stub implementation of `ribble-button`.
 *
 * This exists to register the `ribble-button` custom element so other
 * components (Form, Modal footers, CLI-scaffolded user code) can render
 * `<ribble-button>` without the element being unknown.
 *
 * The full-feature Button described by `Button.test.ts` (variant, size,
 * loading spinner, type, keyboard activation, ARIA states) is a follow-up
 * in M4. See the TODO in `__tests__/Button.test.ts` for the spec.
 */
const style = `
:host {
  display: inline-block;
  --ribble-button-bg: var(--color-primary, #007bff);
  --ribble-button-color: var(--color-on-primary, #fff);
  --ribble-button-radius: var(--radius-md, 0.375rem);
  --ribble-button-padding: 0.5em 1.25em;
  --ribble-button-font: inherit;
}

button {
  background: var(--ribble-button-bg);
  color: var(--ribble-button-color);
  border-radius: var(--ribble-button-radius);
  padding: var(--ribble-button-padding);
  font: var(--ribble-button-font);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:focus-visible {
  outline: 2px solid var(--color-primary, #007bff);
  outline-offset: 2px;
}

:host([disabled]) button {
  opacity: 0.5;
  pointer-events: none;
}
`;

export class Button extends UIComponent {
  static is = 'ribble-button';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  constructor() {
    super({ shadow: { mode: 'open' }, aria: { role: 'button' }, tabIndex: 0 });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <button
        part="button"
        type="${this.type}"
        role="button"
        ${this.disabled ? 'disabled aria-disabled="true"' : ''}
      >
        <slot></slot>
      </button>
    `;
    this._attachEvents();
  }

  protected _attachEvents() {
    const btn = this._shadow.querySelector('button');
    if (!btn) return;
    btn.onclick = (e) => {
      if (!this.disabled) this.emit('click', e);
    };
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'disabled') {
      this.disabled = newValue !== null && newValue !== 'false';
    }
    if (name === 'type') {
      this.type = (newValue as Button['type']) || 'button';
    }
  }
}

customElements.define(Button.is, Button);
