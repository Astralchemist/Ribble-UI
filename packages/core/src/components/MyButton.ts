import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --my-button-bg: var(--color-primary, #007bff);
  --my-button-color: var(--color-on-primary, #fff);
  --my-button-radius: 4px;
  --my-button-padding: 0.5em 1.5em;
  --my-button-font: inherit;
  --my-button-border: none;
  --my-button-outline: 2px solid var(--color-primary, #007bff);
  --my-button-outline-offset: 2px;
}
button {
  background: var(--my-button-bg);
  color: var(--my-button-color);
  border-radius: var(--my-button-radius);
  padding: var(--my-button-padding);
  font: var(--my-button-font);
  border: var(--my-button-border);
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.2s;
}
button:focus {
  outline: var(--my-button-outline);
  outline-offset: var(--my-button-outline-offset);
}
:host([disabled]) button {
  opacity: 0.5;
  pointer-events: none;
}
`;

export class MyButton extends UIComponent {
  static is = 'my-button';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  label = '';

  constructor() {
    super({ shadow: { mode: 'open' }, aria: { role: 'button' }, tabIndex: 0 });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <button part="button" ?disabled="${this.disabled}" aria-disabled="${this.disabled}">
        <slot>${this.label}</slot>
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
    btn.onkeydown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!this.disabled) this.emit('click', e);
      }
    };
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'disabled') {
      this.disabled = newValue !== null && newValue !== 'false';
    }
    if (name === 'label') {
      this.label = newValue;
    }
  }
}

customElements.define(MyButton.is, MyButton);
