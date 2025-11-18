import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  --input-bg: var(--color-surface, #ffffff);
  --input-border: var(--color-border, #d1d5db);
  --input-border-hover: var(--color-border-hover, #9ca3af);
  --input-border-focus: var(--color-primary, #007bff);
  --input-text-color: var(--color-text, #1a1a1a);
  --input-placeholder-color: var(--color-text-muted, #6b7280);
  --input-disabled-bg: var(--color-surface-disabled, #f3f4f6);
  --input-disabled-color: var(--color-text-disabled, #9ca3af);
  --input-error-border: var(--color-error, #dc3545);
  --input-radius: var(--radius-md, 0.375rem);
  --input-padding: var(--spacing-3, 0.75rem);
  --input-font-size: var(--font-size-base, 1rem);
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1, 0.25rem);
}

.input-label {
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--input-text-color);
  margin-bottom: var(--spacing-1, 0.25rem);
}

.input-label.required::after {
  content: '*';
  color: var(--color-error, #dc3545);
  margin-left: var(--spacing-1, 0.25rem);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: var(--input-padding);
  font-size: var(--input-font-size);
  color: var(--input-text-color);
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  border-radius: var(--input-radius);
  transition: all 0.2s ease;
  font-family: inherit;
}

.input-field:hover:not(:disabled) {
  border-color: var(--input-border-hover);
}

.input-field:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.input-field::placeholder {
  color: var(--input-placeholder-color);
}

.input-field:disabled {
  background: var(--input-disabled-bg);
  color: var(--input-disabled-color);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-field.error {
  border-color: var(--input-error-border);
}

.input-field.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--input-placeholder-color);
  pointer-events: none;
}

.input-icon.left {
  left: var(--input-padding);
}

.input-icon.right {
  right: var(--input-padding);
}

.input-field.has-icon-left {
  padding-left: calc(var(--input-padding) * 2.5);
}

.input-field.has-icon-right {
  padding-right: calc(var(--input-padding) * 2.5);
}

.input-helper {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--input-placeholder-color);
  margin-top: var(--spacing-1, 0.25rem);
}

.input-error {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--input-error-border);
  margin-top: var(--spacing-1, 0.25rem);
}
`;

export class Input extends UIComponent {
  static is = 'ui-input';

  @property({ type: String, reflect: true })
  type = 'text';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  placeholder = '';

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: String, reflect: true })
  error = '';

  @property({ type: String, reflect: true })
  helper = '';

  @property({ type: String, reflect: true })
  pattern = '';

  @property({ type: Number, reflect: true })
  minlength = 0;

  @property({ type: Number, reflect: true })
  maxlength = 0;

  @property({ type: String, reflect: true })
  autocomplete = '';

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'textbox' }
    });
  }

  protected _render() {
    const hasLabel = this.label.length > 0;
    const hasError = this.error.length > 0;
    const hasHelper = this.helper.length > 0;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="input-wrapper" part="wrapper">
        ${hasLabel ? `
          <label class="input-label ${this.required ? 'required' : ''}" part="label">
            ${this.label}
          </label>
        ` : ''}

        <div class="input-container" part="container">
          <input
            type="${this.type}"
            class="input-field ${hasError ? 'error' : ''}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            value="${this.value}"
            ${this.disabled ? 'disabled' : ''}
            ${this.required ? 'required' : ''}
            ${this.readonly ? 'readonly' : ''}
            ${this.pattern ? `pattern="${this.pattern}"` : ''}
            ${this.minlength > 0 ? `minlength="${this.minlength}"` : ''}
            ${this.maxlength > 0 ? `maxlength="${this.maxlength}"` : ''}
            ${this.autocomplete ? `autocomplete="${this.autocomplete}"` : ''}
            aria-label="${this.label || this.placeholder}"
            ${hasError ? `aria-invalid="true" aria-describedby="error-${this.name}"` : ''}
            part="input"
          />
        </div>

        ${hasError ? `
          <div class="input-error" id="error-${this.name}" role="alert" part="error">
            ${this.error}
          </div>
        ` : hasHelper ? `
          <div class="input-helper" part="helper">
            ${this.helper}
          </div>
        ` : ''}
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const input = this._shadow.querySelector('.input-field') as HTMLInputElement;

    if (input) {
      input.oninput = (e) => {
        this.value = (e.target as HTMLInputElement).value;
        this.emit('input', { value: this.value });
      };

      input.onchange = (e) => {
        this.value = (e.target as HTMLInputElement).value;
        this.emit('change', { value: this.value });
      };

      input.onblur = () => {
        this.emit('blur', { value: this.value });
      };

      input.onfocus = () => {
        this.emit('focus', { value: this.value });
      };
    }
  }

  focus() {
    const input = this._shadow.querySelector('.input-field') as HTMLInputElement;
    input?.focus();
  }

  blur() {
    const input = this._shadow.querySelector('.input-field') as HTMLInputElement;
    input?.blur();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'type':
        this.type = newValue || 'text';
        break;
      case 'value':
        this.value = newValue || '';
        break;
      case 'placeholder':
        this.placeholder = newValue || '';
        break;
      case 'label':
        this.label = newValue || '';
        break;
      case 'name':
        this.name = newValue || '';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'required':
        this.required = newValue !== null;
        break;
      case 'readonly':
        this.readonly = newValue !== null;
        break;
      case 'error':
        this.error = newValue || '';
        break;
      case 'helper':
        this.helper = newValue || '';
        break;
    }
  }
}

customElements.define(Input.is, Input);
