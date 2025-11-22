import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  max-width: 12rem;
}

.number-container {
  position: relative;
  width: 100%;
}

.number-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
}

.number-input {
  flex: 1;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  text-align: center;
  transition: all 0.2s ease;
  -moz-appearance: textfield;
}

.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.number-input::placeholder {
  color: var(--color-text-secondary, #94a3b8);
}

.number-input.error {
  border-color: var(--color-error, #ef4444);
}

.number-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.stepper-buttons {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.stepper-btn {
  flex: 1;
  width: 2rem;
  border: 1px solid var(--color-border, #e2e8f0);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.stepper-btn:first-child {
  border-top-right-radius: var(--radius-md, 0.375rem);
  border-bottom: none;
}

.stepper-btn:last-child {
  border-bottom-right-radius: var(--radius-md, 0.375rem);
}

.stepper-btn:hover:not(:disabled) {
  background: var(--color-bg-secondary, #f1f5f9);
}

.stepper-btn:active:not(:disabled) {
  background: var(--color-border, #e2e8f0);
}

.stepper-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stepper-btn:focus {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: -2px;
  z-index: 1;
}

:host([variant="inline"]) .number-wrapper {
  display: inline-flex;
  gap: 0.5rem;
}

:host([variant="inline"]) .number-input {
  min-width: 4rem;
  padding-right: 1rem;
}

:host([variant="inline"]) .stepper-buttons {
  position: static;
  flex-direction: row;
}

:host([variant="inline"]) .stepper-btn {
  width: 2rem;
  height: 2.5rem;
  border-radius: var(--radius-md, 0.375rem);
}

:host([variant="inline"]) .stepper-btn:first-child {
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.helper-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748b);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-error, #ef4444);
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}

:host([size="small"]) .number-input {
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
}

:host([size="small"]) .stepper-btn {
  width: 1.75rem;
}

:host([size="large"]) .number-input {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
}

:host([size="large"]) .stepper-btn {
  width: 2.5rem;
}
`;

export class NumberInput extends UIComponent {
  static is = 'ui-number-input';

  @property({ type: Number, reflect: true })
  value = 0;

  @property({ type: Number, reflect: true })
  min = -Infinity;

  @property({ type: Number, reflect: true })
  max = Infinity;

  @property({ type: Number, reflect: true })
  step = 1;

  @property({ type: String, reflect: true })
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  variant: 'default' | 'inline' = 'default';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  errorMessage = '';

  @property({ type: String, reflect: true })
  helperText = '';

  @property({ type: String, reflect: true })
  prefix = '';

  @property({ type: String, reflect: true })
  suffix = '';

  constructor() {
    super();
    this.setAttribute('role', 'spinbutton');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.number-input') as HTMLInputElement;
    const incrementBtn = this._shadow.querySelector('.btn-increment') as HTMLButtonElement;
    const decrementBtn = this._shadow.querySelector('.btn-decrement') as HTMLButtonElement;

    if (input) {
      input.addEventListener('input', (e) => {
        const rawValue = (e.target as HTMLInputElement).value;
        const numValue = parseFloat(rawValue);

        if (!isNaN(numValue)) {
          this.value = this._clampValue(numValue);
        } else if (rawValue === '') {
          this.value = 0;
        }

        this._updateInput();
        this.emit('input', { value: this.value });
      });

      input.addEventListener('blur', () => {
        this._updateInput();
        this.emit('change', { value: this.value });
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this._increment();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this._decrement();
        }
      });
    }

    if (incrementBtn) {
      incrementBtn.addEventListener('click', () => this._increment());
    }

    if (decrementBtn) {
      decrementBtn.addEventListener('click', () => this._decrement());
    }
  }

  private _clampValue(value: number): number {
    return Math.min(Math.max(value, this.min), this.max);
  }

  private _increment() {
    this.value = this._clampValue(this.value + this.step);
    this._updateInput();
    this.emit('change', { value: this.value });
  }

  private _decrement() {
    this.value = this._clampValue(this.value - this.step);
    this._updateInput();
    this.emit('change', { value: this.value });
  }

  private _updateInput() {
    const input = this._shadow.querySelector('.number-input') as HTMLInputElement;
    if (input) {
      input.value = this.value.toString();
    }

    // Update button states
    const incrementBtn = this._shadow.querySelector('.btn-increment') as HTMLButtonElement;
    const decrementBtn = this._shadow.querySelector('.btn-decrement') as HTMLButtonElement;

    if (incrementBtn) {
      incrementBtn.disabled = this.value >= this.max || this.disabled;
    }
    if (decrementBtn) {
      decrementBtn.disabled = this.value <= this.min || this.disabled;
    }
  }

  protected _render() {
    const canIncrement = this.value < this.max;
    const canDecrement = this.value > this.min;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div part="container">
        <div class="number-container">
          <div class="number-wrapper">
            ${this.variant === 'inline' ? `
              <button
                class="stepper-btn btn-decrement"
                part="decrement"
                ${!canDecrement || this.disabled ? 'disabled' : ''}
                aria-label="Decrement"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            ` : ''}
            <input
              type="number"
              class="number-input ${this.error ? 'error' : ''}"
              part="input"
              value="${this.value}"
              placeholder="${this.placeholder}"
              ${this.disabled ? 'disabled' : ''}
              min="${this.min}"
              max="${this.max}"
              step="${this.step}"
              aria-label="Number input"
              aria-valuemin="${this.min}"
              aria-valuemax="${this.max}"
              aria-valuenow="${this.value}"
            />
            ${this.variant === 'default' ? `
              <div class="stepper-buttons">
                <button
                  class="stepper-btn btn-increment"
                  part="increment"
                  ${!canIncrement || this.disabled ? 'disabled' : ''}
                  aria-label="Increment"
                  tabindex="-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <button
                  class="stepper-btn btn-decrement"
                  part="decrement"
                  ${!canDecrement || this.disabled ? 'disabled' : ''}
                  aria-label="Decrement"
                  tabindex="-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            ` : `
              <button
                class="stepper-btn btn-increment"
                part="increment"
                ${!canIncrement || this.disabled ? 'disabled' : ''}
                aria-label="Increment"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        </div>
        ${this.error && this.errorMessage ? `
          <span class="error-message" part="error" role="alert">${this.errorMessage}</span>
        ` : this.helperText ? `
          <span class="helper-text" part="helper">${this.helperText}</span>
        ` : ''}
      </div>
    `;

    this._attachEventListeners();
    this._updateInput();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = parseFloat(newValue) || 0;
        break;
      case 'min':
        this.min = parseFloat(newValue) ?? -Infinity;
        break;
      case 'max':
        this.max = parseFloat(newValue) ?? Infinity;
        break;
      case 'step':
        this.step = parseFloat(newValue) || 1;
        break;
      case 'placeholder':
        this.placeholder = newValue || '';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'variant':
        this.variant = (newValue as any) || 'default';
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
      case 'error':
        this.error = newValue !== null;
        break;
      case 'errorMessage':
        this.errorMessage = newValue || '';
        break;
      case 'helperText':
        this.helperText = newValue || '';
        break;
    }
  }

  // Public API
  public increment() {
    this._increment();
  }

  public decrement() {
    this._decrement();
  }

  public setValue(value: number) {
    this.value = this._clampValue(value);
    this._updateInput();
  }
}

customElements.define(NumberInput.is, NumberInput);
