import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --radio-size: 1.25rem;
  --radio-bg: var(--color-surface, #ffffff);
  --radio-border: var(--color-border, #d1d5db);
  --radio-border-hover: var(--color-border-hover, #9ca3af);
  --radio-checked-bg: var(--color-primary, #007bff);
  --radio-checked-border: var(--color-primary, #007bff);
  --radio-disabled-bg: var(--color-surface-disabled, #f3f4f6);
  --radio-text-color: var(--color-text, #1a1a1a);
}

.radio-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2, 0.5rem);
  cursor: pointer;
  user-select: none;
}

.radio-wrapper.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-circle {
  position: relative;
  width: var(--radio-size);
  height: var(--radio-size);
  background: var(--radio-bg);
  border: 2px solid var(--radio-border);
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-wrapper:hover:not(.disabled) .radio-circle {
  border-color: var(--radio-border-hover);
}

.radio-input:checked + .radio-circle {
  border-color: var(--radio-checked-border);
}

.radio-input:focus + .radio-circle {
  outline: 2px solid var(--radio-checked-border);
  outline-offset: 2px;
}

.radio-input:disabled + .radio-circle {
  background: var(--radio-disabled-bg);
  cursor: not-allowed;
}

.radio-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: var(--radio-checked-bg);
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.2s ease;
}

.radio-input:checked + .radio-circle .radio-dot {
  transform: scale(1);
}

.radio-label {
  font-size: var(--font-size-base, 1rem);
  color: var(--radio-text-color);
}
`;

export class Radio extends UIComponent {
  static is = 'ui-radio';

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

  @property({ type: Boolean, reflect: true })
  required = false;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'radio' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <label class="radio-wrapper ${this.disabled ? 'disabled' : ''}" part="wrapper">
        <input
          type="radio"
          class="radio-input"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.required ? 'required' : ''}
          aria-checked="${this.checked}"
          aria-label="${this.label}"
          part="input"
        />
        <div class="radio-circle" part="circle">
          <div class="radio-dot" part="dot"></div>
        </div>
        ${this.label ? `
          <span class="radio-label" part="label">${this.label}</span>
        ` : ''}
      </label>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const input = this._shadow.querySelector('.radio-input') as HTMLInputElement;

    if (input) {
      input.onchange = (e) => {
        this.checked = (e.target as HTMLInputElement).checked;
        this.emit('change', { checked: this.checked, value: this.value, name: this.name });
      };
    }
  }

  select() {
    if (!this.disabled) {
      this.checked = true;
      this._render();
      this.emit('change', { checked: this.checked, value: this.value, name: this.name });
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
      case 'required':
        this.required = newValue !== null;
        break;
    }
  }
}

customElements.define(Radio.is, Radio);
