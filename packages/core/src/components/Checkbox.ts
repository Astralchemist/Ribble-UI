import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --checkbox-size: 1.25rem;
  --checkbox-bg: var(--color-surface, #ffffff);
  --checkbox-border: var(--color-border, #d1d5db);
  --checkbox-border-hover: var(--color-border-hover, #9ca3af);
  --checkbox-checked-bg: var(--color-primary, #007bff);
  --checkbox-checked-border: var(--color-primary, #007bff);
  --checkbox-disabled-bg: var(--color-surface-disabled, #f3f4f6);
  --checkbox-text-color: var(--color-text, #1a1a1a);
  --checkbox-radius: var(--radius-sm, 0.25rem);
}

.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2, 0.5rem);
  cursor: pointer;
  user-select: none;
}

.checkbox-wrapper.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-box {
  position: relative;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  background: var(--checkbox-bg);
  border: 2px solid var(--checkbox-border);
  border-radius: var(--checkbox-radius);
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-wrapper:hover:not(.disabled) .checkbox-box {
  border-color: var(--checkbox-border-hover);
}

.checkbox-input:checked + .checkbox-box {
  background: var(--checkbox-checked-bg);
  border-color: var(--checkbox-checked-border);
}

.checkbox-input:focus + .checkbox-box {
  outline: 2px solid var(--checkbox-checked-border);
  outline-offset: 2px;
}

.checkbox-input:disabled + .checkbox-box {
  background: var(--checkbox-disabled-bg);
  cursor: not-allowed;
}

.checkbox-checkmark {
  display: none;
  width: 0.75rem;
  height: 0.75rem;
  color: white;
}

.checkbox-input:checked + .checkbox-box .checkbox-checkmark {
  display: block;
}

.checkbox-label {
  font-size: var(--font-size-base, 1rem);
  color: var(--checkbox-text-color);
}
`;

export class Checkbox extends UIComponent {
  static is = 'ui-checkbox';

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
      aria: { role: 'checkbox' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <label class="checkbox-wrapper ${this.disabled ? 'disabled' : ''}" part="wrapper">
        <input
          type="checkbox"
          class="checkbox-input"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.required ? 'required' : ''}
          aria-checked="${this.checked}"
          aria-label="${this.label}"
          part="input"
        />
        <div class="checkbox-box" part="box">
          <svg class="checkbox-checkmark" viewBox="0 0 16 16" fill="currentColor" part="checkmark">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        </div>
        ${this.label ? `
          <span class="checkbox-label" part="label">${this.label}</span>
        ` : ''}
      </label>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const input = this._shadow.querySelector('.checkbox-input') as HTMLInputElement;

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
      case 'required':
        this.required = newValue !== null;
        break;
    }
  }
}

customElements.define(Checkbox.is, Checkbox);
