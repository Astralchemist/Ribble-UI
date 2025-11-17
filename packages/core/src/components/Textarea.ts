import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  --textarea-bg: var(--color-surface, #ffffff);
  --textarea-border: var(--color-border, #d1d5db);
  --textarea-border-hover: var(--color-border-hover, #9ca3af);
  --textarea-border-focus: var(--color-primary, #007bff);
  --textarea-text-color: var(--color-text, #1a1a1a);
  --textarea-placeholder-color: var(--color-text-muted, #6b7280);
  --textarea-disabled-bg: var(--color-surface-disabled, #f3f4f6);
  --textarea-radius: var(--radius-md, 0.375rem);
  --textarea-padding: var(--spacing-3, 0.75rem);
}

.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1, 0.25rem);
}

.textarea-label {
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--textarea-text-color);
  margin-bottom: var(--spacing-1, 0.25rem);
}

.textarea-label.required::after {
  content: '*';
  color: var(--color-error, #dc3545);
  margin-left: var(--spacing-1, 0.25rem);
}

.textarea-field {
  width: 100%;
  padding: var(--textarea-padding);
  font-size: var(--font-size-base, 1rem);
  color: var(--textarea-text-color);
  background: var(--textarea-bg);
  border: 2px solid var(--textarea-border);
  border-radius: var(--textarea-radius);
  transition: all 0.2s ease;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
}

.textarea-field:hover:not(:disabled) {
  border-color: var(--textarea-border-hover);
}

.textarea-field:focus {
  outline: none;
  border-color: var(--textarea-border-focus);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.textarea-field::placeholder {
  color: var(--textarea-placeholder-color);
}

.textarea-field:disabled {
  background: var(--textarea-disabled-bg);
  cursor: not-allowed;
  opacity: 0.6;
}

.textarea-helper {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--textarea-placeholder-color);
  margin-top: var(--spacing-1, 0.25rem);
}

.textarea-counter {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--textarea-placeholder-color);
  text-align: right;
  margin-top: var(--spacing-1, 0.25rem);
}
`;

export class Textarea extends UIComponent {
  static is = 'ui-textarea';

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
  helper = '';

  @property({ type: Number, reflect: true })
  rows = 4;

  @property({ type: Number, reflect: true })
  maxlength = 0;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'textbox', multiline: 'true' }
    });
  }

  protected _render() {
    const hasLabel = this.label.length > 0;
    const hasHelper = this.helper.length > 0;
    const showCounter = this.maxlength > 0;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="textarea-wrapper" part="wrapper">
        ${hasLabel ? `
          <label class="textarea-label ${this.required ? 'required' : ''}" part="label">
            ${this.label}
          </label>
        ` : ''}

        <textarea
          class="textarea-field"
          placeholder="${this.placeholder}"
          name="${this.name}"
          rows="${this.rows}"
          ${this.disabled ? 'disabled' : ''}
          ${this.required ? 'required' : ''}
          ${this.readonly ? 'readonly' : ''}
          ${this.maxlength > 0 ? `maxlength="${this.maxlength}"` : ''}
          aria-label="${this.label || this.placeholder}"
          part="textarea"
        >${this.value}</textarea>

        ${hasHelper ? `
          <div class="textarea-helper" part="helper">
            ${this.helper}
          </div>
        ` : ''}

        ${showCounter ? `
          <div class="textarea-counter" part="counter">
            ${this.value.length} / ${this.maxlength}
          </div>
        ` : ''}
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const textarea = this._shadow.querySelector('.textarea-field') as HTMLTextAreaElement;

    if (textarea) {
      textarea.oninput = (e) => {
        this.value = (e.target as HTMLTextAreaElement).value;
        this.emit('input', { value: this.value });
        if (this.maxlength > 0) {
          this._updateCounter();
        }
      };

      textarea.onchange = (e) => {
        this.value = (e.target as HTMLTextAreaElement).value;
        this.emit('change', { value: this.value });
      };

      textarea.onblur = () => {
        this.emit('blur', { value: this.value });
      };

      textarea.onfocus = () => {
        this.emit('focus', { value: this.value });
      };
    }
  }

  protected _updateCounter() {
    const counter = this._shadow.querySelector('.textarea-counter');
    if (counter) {
      counter.textContent = `${this.value.length} / ${this.maxlength}`;
    }
  }

  focus() {
    const textarea = this._shadow.querySelector('.textarea-field') as HTMLTextAreaElement;
    textarea?.focus();
  }

  blur() {
    const textarea = this._shadow.querySelector('.textarea-field') as HTMLTextAreaElement;
    textarea?.blur();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
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
      case 'helper':
        this.helper = newValue || '';
        break;
      case 'rows':
        this.rows = parseInt(newValue) || 4;
        break;
      case 'maxlength':
        this.maxlength = parseInt(newValue) || 0;
        break;
    }
  }
}

customElements.define(Textarea.is, Textarea);
