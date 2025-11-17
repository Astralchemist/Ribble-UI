import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --switch-width: 2.75rem;
  --switch-height: 1.5rem;
  --switch-bg: var(--color-border, #d1d5db);
  --switch-bg-checked: var(--color-primary, #007bff);
  --switch-thumb-bg: var(--color-surface, #ffffff);
  --switch-disabled-bg: var(--color-surface-disabled, #f3f4f6);
  --switch-text-color: var(--color-text, #1a1a1a);
}

.switch-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2, 0.5rem);
  cursor: pointer;
  user-select: none;
}

.switch-wrapper.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-track {
  position: relative;
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  border-radius: calc(var(--switch-height) / 2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.switch-input:checked + .switch-track {
  background: var(--switch-bg-checked);
}

.switch-input:focus + .switch-track {
  outline: 2px solid var(--switch-bg-checked);
  outline-offset: 2px;
}

.switch-input:disabled + .switch-track {
  background: var(--switch-disabled-bg);
}

.switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(var(--switch-height) - 4px);
  height: calc(var(--switch-height) - 4px);
  background: var(--switch-thumb-bg);
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(calc(var(--switch-width) - var(--switch-height)));
}

.switch-label {
  font-size: var(--font-size-base, 1rem);
  color: var(--switch-text-color);
}
`;

export class Switch extends UIComponent {
  static is = 'ui-switch';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'switch' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <label class="switch-wrapper ${this.disabled ? 'disabled' : ''}" part="wrapper">
        <input
          type="checkbox"
          class="switch-input"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
          aria-checked="${this.checked}"
          aria-label="${this.label}"
          role="switch"
          part="input"
        />
        <div class="switch-track" part="track">
          <div class="switch-thumb" part="thumb"></div>
        </div>
        ${this.label ? `
          <span class="switch-label" part="label">${this.label}</span>
        ` : ''}
      </label>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const input = this._shadow.querySelector('.switch-input') as HTMLInputElement;

    if (input) {
      input.onchange = (e) => {
        this.checked = (e.target as HTMLInputElement).checked;
        this.emit('change', { checked: this.checked, value: this.value });
      };
    }
  }

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this._render();
      this.emit('change', { checked: this.checked, value: this.value });
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'checked':
        this.checked = newValue !== null;
        break;
      case 'label':
        this.label = newValue || '';
        break;
      case 'name':
        this.name = newValue || '';
        break;
      case 'value':
        this.value = newValue || '';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
    }
  }
}

customElements.define(Switch.is, Switch);
