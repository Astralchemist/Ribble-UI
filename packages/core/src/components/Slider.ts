import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
  --slider-height: 0.5rem;
  --slider-thumb-size: 1.25rem;
  --slider-track-bg: var(--color-border, #e2e8f0);
  --slider-fill-bg: var(--color-primary, #3b82f6);
  --slider-thumb-bg: var(--color-surface, #fff);
}

.slider-container {
  width: 100%;
  padding: 1rem 0;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.slider-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #1e293b);
}

.slider-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary, #3b82f6);
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: var(--slider-height);
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--slider-track-bg);
  border-radius: 9999px;
  overflow: hidden;
}

.slider-fill {
  position: absolute;
  height: 100%;
  background: var(--slider-fill-bg);
  border-radius: 9999px;
  transition: width 0.1s ease;
}

.slider-input {
  position: absolute;
  width: 100%;
  height: var(--slider-thumb-size);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  cursor: pointer;
  margin: 0;
}

.slider-thumb {
  position: absolute;
  width: var(--slider-thumb-size);
  height: var(--slider-thumb-size);
  background: var(--slider-thumb-bg);
  border: 2px solid var(--slider-fill-bg);
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-input:hover + .slider-thumb {
  transform: translate(-50%, -50%) scale(1.1);
}

.slider-input:focus + .slider-thumb {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.slider-input:disabled + .slider-thumb {
  opacity: 0.5;
  cursor: not-allowed;
}

.slider-marks {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.slider-mark {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748b);
}

:host([disabled]) {
  opacity: 0.6;
  cursor: not-allowed;
}
`;

export class Slider extends UIComponent {
  static is = 'ui-slider';

  @property({ type: Number, reflect: true })
  min = 0;

  @property({ type: Number, reflect: true })
  max = 100;

  @property({ type: Number, reflect: true })
  value = 50;

  @property({ type: Number, reflect: true })
  step = 1;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  showValue = true;

  @property({ type: Boolean, reflect: true })
  showMarks = false;

  @property({ type: String, reflect: true })
  unit = '';

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.slider-input') as HTMLInputElement;
    if (input) {
      input.addEventListener('input', this._handleInput.bind(this));
      input.addEventListener('change', this._handleChange.bind(this));
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = parseFloat(input.value);
    this._updateUI();
    this.emit('input', { value: this.value });
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = parseFloat(input.value);
    this.emit('change', { value: this.value });
  }

  private _updateUI() {
    const fill = this._shadow.querySelector('.slider-fill') as HTMLElement;
    const thumb = this._shadow.querySelector('.slider-thumb') as HTMLElement;
    const valueDisplay = this._shadow.querySelector('.slider-value') as HTMLElement;

    if (fill && thumb) {
      const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
      fill.style.width = `${percentage}%`;
      thumb.style.left = `${percentage}%`;
    }

    if (valueDisplay) {
      valueDisplay.textContent = `${this.value}${this.unit}`;
    }
  }

  protected _render() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="slider-container" part="container">
        ${this.label || this.showValue ? `
          <div class="slider-header" part="header">
            ${this.label ? `<label class="slider-label" part="label">${this.label}</label>` : '<span></span>'}
            ${this.showValue ? `<span class="slider-value" part="value">${this.value}${this.unit}</span>` : ''}
          </div>
        ` : ''}
        <div class="slider-wrapper" part="wrapper">
          <div class="slider-track" part="track">
            <div class="slider-fill" part="fill" style="width: ${percentage}%"></div>
          </div>
          <input
            type="range"
            class="slider-input"
            part="input"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            value="${this.value}"
            ${this.disabled ? 'disabled' : ''}
            aria-label="${this.label || 'Slider'}"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuenow="${this.value}"
          />
          <div class="slider-thumb" part="thumb" style="left: ${percentage}%"></div>
        </div>
        ${this.showMarks ? `
          <div class="slider-marks" part="marks">
            <span class="slider-mark">${this.min}${this.unit}</span>
            <span class="slider-mark">${this.max}${this.unit}</span>
          </div>
        ` : ''}
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'min':
        this.min = parseFloat(newValue) || 0;
        break;
      case 'max':
        this.max = parseFloat(newValue) || 100;
        break;
      case 'value':
        this.value = parseFloat(newValue) || 0;
        break;
      case 'step':
        this.step = parseFloat(newValue) || 1;
        break;
      case 'label':
        this.label = newValue || '';
        break;
      case 'unit':
        this.unit = newValue || '';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'showValue':
        this.showValue = newValue !== null;
        break;
      case 'showMarks':
        this.showMarks = newValue !== null;
        break;
    }
  }
}

customElements.define(Slider.is, Slider);
