import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --picker-size: 2.5rem;
}

.color-picker-container {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.color-preview {
  width: var(--picker-size);
  height: var(--picker-size);
  border-radius: var(--radius-md, 0.375rem);
  border: 2px solid var(--color-border, #e2e8f0);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.color-preview:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.color-preview:focus-within {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: 2px;
}

.color-preview-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.color-preview-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.color-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.color-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #1e293b);
}

.color-value {
  font-family: var(--font-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  color: var(--color-text-secondary, #64748b);
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-secondary, #f1f5f9);
  border-radius: var(--radius-sm, 0.25rem);
}

.preset-colors {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.preset-color {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--radius-sm, 0.25rem);
  border: 2px solid var(--color-border, #e2e8f0);
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-color:hover {
  transform: scale(1.1);
}

.preset-color:focus {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: 2px;
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}

:host([size="small"]) {
  --picker-size: 2rem;
}

:host([size="large"]) {
  --picker-size: 3rem;
}
`;

export class ColorPicker extends UIComponent {
  static is = 'ui-color-picker';

  @property({ type: String, reflect: true })
  value = '#3b82f6';

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  showValue = true;

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  presets = '';

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.color-input') as HTMLInputElement;
    if (input) {
      input.addEventListener('input', this._handleInput.bind(this));
      input.addEventListener('change', this._handleChange.bind(this));
    }

    const presetButtons = this._shadow.querySelectorAll('.preset-color');
    presetButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const color = (e.target as HTMLElement).getAttribute('data-color');
        if (color) {
          this.value = color;
          this._updateUI();
          this.emit('change', { value: this.value });
        }
      });
    });
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._updateUI();
    this.emit('input', { value: this.value });
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.emit('change', { value: this.value });
  }

  private _updateUI() {
    const colorDiv = this._shadow.querySelector('.color-preview-color') as HTMLElement;
    const valueDisplay = this._shadow.querySelector('.color-value') as HTMLElement;

    if (colorDiv) {
      colorDiv.style.backgroundColor = this.value;
    }

    if (valueDisplay) {
      valueDisplay.textContent = this.value.toUpperCase();
    }
  }

  private _getPresetColors(): string[] {
    if (this.presets) {
      return this.presets.split(',').map(c => c.trim());
    }
    return ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b', '#000000'];
  }

  protected _render() {
    const presetColors = this._getPresetColors();

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="color-picker-container" part="container">
        ${this.label ? `<label class="color-label" part="label">${this.label}</label>` : ''}
        <div class="color-preview" part="preview">
          <div class="color-preview-bg"></div>
          <div class="color-preview-color" style="background-color: ${this.value}"></div>
          <input
            type="color"
            class="color-input"
            part="input"
            value="${this.value}"
            ${this.disabled ? 'disabled' : ''}
            aria-label="${this.label || 'Color picker'}"
          />
        </div>
        ${this.showValue ? `<span class="color-value" part="value">${this.value.toUpperCase()}</span>` : ''}
      </div>
      ${presetColors.length > 0 ? `
        <div class="preset-colors" part="presets" role="group" aria-label="Preset colors">
          ${presetColors.map(color => `
            <button
              class="preset-color"
              part="preset"
              style="background-color: ${color}"
              data-color="${color}"
              aria-label="Select ${color}"
              tabindex="0"
            ></button>
          `).join('')}
        </div>
      ` : ''}
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = newValue || '#3b82f6';
        break;
      case 'label':
        this.label = newValue || '';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'showValue':
        this.showValue = newValue !== null;
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
      case 'presets':
        this.presets = newValue || '';
        break;
    }
  }
}

customElements.define(ColorPicker.is, ColorPicker);
