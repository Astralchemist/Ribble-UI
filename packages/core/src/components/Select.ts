import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  --select-bg: var(--color-surface, #ffffff);
  --select-border: var(--color-border, #d1d5db);
  --select-border-hover: var(--color-border-hover, #9ca3af);
  --select-border-focus: var(--color-primary, #007bff);
  --select-text-color: var(--color-text, #1a1a1a);
  --select-disabled-bg: var(--color-surface-disabled, #f3f4f6);
  --select-radius: var(--radius-md, 0.375rem);
  --select-padding: var(--spacing-3, 0.75rem);
}

.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1, 0.25rem);
}

.select-label {
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--select-text-color);
  margin-bottom: var(--spacing-1, 0.25rem);
}

.select-label.required::after {
  content: '*';
  color: var(--color-error, #dc3545);
  margin-left: var(--spacing-1, 0.25rem);
}

.select-field {
  width: 100%;
  padding: var(--select-padding);
  font-size: var(--font-size-base, 1rem);
  color: var(--select-text-color);
  background: var(--select-bg);
  border: 2px solid var(--select-border);
  border-radius: var(--select-radius);
  transition: all 0.2s ease;
  font-family: inherit;
  cursor: pointer;
}

.select-field:hover:not(:disabled) {
  border-color: var(--select-border-hover);
}

.select-field:focus {
  outline: none;
  border-color: var(--select-border-focus);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.select-field:disabled {
  background: var(--select-disabled-bg);
  cursor: not-allowed;
  opacity: 0.6;
}

.select-helper {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--color-text-muted, #6b7280);
  margin-top: var(--spacing-1, 0.25rem);
}
`;

export class Select extends UIComponent {
  static is = 'ui-select';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  helper = '';

  @property({ type: Array })
  options: { value: string; label: string }[] = [];

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'combobox' }
    });
  }

  protected _render() {
    const hasLabel = this.label.length > 0;
    const hasHelper = this.helper.length > 0;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="select-wrapper" part="wrapper">
        ${hasLabel ? `
          <label class="select-label ${this.required ? 'required' : ''}" part="label">
            ${this.label}
          </label>
        ` : ''}

        <select
          class="select-field"
          name="${this.name}"
          ${this.disabled ? 'disabled' : ''}
          ${this.required ? 'required' : ''}
          aria-label="${this.label}"
          part="select"
        >
          ${this.options.map(opt => `
            <option value="${opt.value}" ${opt.value === this.value ? 'selected' : ''}>
              ${opt.label}
            </option>
          `).join('')}
        </select>

        ${hasHelper ? `
          <div class="select-helper" part="helper">
            ${this.helper}
          </div>
        ` : ''}
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const select = this._shadow.querySelector('.select-field') as HTMLSelectElement;

    if (select) {
      select.onchange = (e) => {
        this.value = (e.target as HTMLSelectElement).value;
        this.emit('change', { value: this.value });
      };
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = newValue || '';
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
      case 'helper':
        this.helper = newValue || '';
        break;
    }
  }
}

customElements.define(Select.is, Select);
