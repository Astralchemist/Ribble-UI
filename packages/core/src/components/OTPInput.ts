import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
}

.otp-container {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.otp-input {
  width: 2.5rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  transition: all 0.2s ease;
  outline: none;
}

.otp-input:focus {
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.otp-input:disabled {
  background: var(--color-bg-disabled, #f1f5f9);
  cursor: not-allowed;
  opacity: 0.6;
}

.otp-input.error {
  border-color: var(--color-error, #ef4444);
}

.otp-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.otp-input.success {
  border-color: var(--color-success, #10b981);
}

.separator {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-secondary, #64748b);
  user-select: none;
}

:host([size="small"]) .otp-input {
  width: 2rem;
  height: 2.5rem;
  font-size: 1.25rem;
}

:host([size="large"]) .otp-input {
  width: 3rem;
  height: 3.5rem;
  font-size: 1.75rem;
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-error, #ef4444);
}
`;

export class OTPInput extends UIComponent {
  static is = 'ui-otp-input';

  @property({ type: Number, reflect: true })
  length = 6;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  type: 'text' | 'number' | 'password' = 'number';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  errorMessage = '';

  @property({ type: String, reflect: true })
  separator = '';

  private inputs: HTMLInputElement[] = [];

  constructor() {
    super();
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', 'OTP input');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    this.inputs = Array.from(
      this._shadow.querySelectorAll('.otp-input')
    ) as HTMLInputElement[];

    this.inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => this._handleInput(e, index));
      input.addEventListener('keydown', (e) => this._handleKeydown(e, index));
      input.addEventListener('paste', (e) => this._handlePaste(e, index));
      input.addEventListener('focus', () => input.select());
    });
  }

  private _handleInput(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    let value = input.value;

    // For number type, only allow digits
    if (this.type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    // Only keep the last character if multiple were entered
    if (value.length > 1) {
      value = value.slice(-1);
    }

    input.value = value;

    // Update the value
    this._updateValue();

    // Move to next input if value is entered
    if (value && index < this.length - 1) {
      this.inputs[index + 1]?.focus();
    }

    // Emit events
    this.emit('input', { value: this.value });

    // If all inputs are filled, emit complete event
    if (this.value.length === this.length) {
      this.emit('complete', { value: this.value });
    }
  }

  private _handleKeydown(e: KeyboardEvent, index: number) {
    const input = e.target as HTMLInputElement;

    // Handle backspace
    if (e.key === 'Backspace') {
      if (!input.value && index > 0) {
        // Move to previous input and clear it
        this.inputs[index - 1]?.focus();
        this.inputs[index - 1].value = '';
        this._updateValue();
      }
    }

    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this.inputs[index - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault();
      this.inputs[index + 1]?.focus();
    }

    // Handle Enter
    if (e.key === 'Enter' && this.value.length === this.length) {
      this.emit('submit', { value: this.value });
    }
  }

  private _handlePaste(e: ClipboardEvent, startIndex: number) {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text') || '';

    let cleanedData = pastedData;
    if (this.type === 'number') {
      cleanedData = pastedData.replace(/[^0-9]/g, '');
    }

    // Fill the inputs with pasted data
    const chars = cleanedData.split('').slice(0, this.length - startIndex);
    chars.forEach((char, i) => {
      const input = this.inputs[startIndex + i];
      if (input) {
        input.value = char;
      }
    });

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = this.inputs.findIndex(inp => !inp.value);
    if (nextEmptyIndex >= 0) {
      this.inputs[nextEmptyIndex]?.focus();
    } else {
      this.inputs[this.length - 1]?.focus();
    }

    this._updateValue();
    this.emit('input', { value: this.value });

    if (this.value.length === this.length) {
      this.emit('complete', { value: this.value });
    }
  }

  private _updateValue() {
    this.value = this.inputs.map(input => input.value).join('');
  }

  private _setValue(value: string) {
    const chars = value.split('').slice(0, this.length);
    this.inputs.forEach((input, i) => {
      input.value = chars[i] || '';
    });
    this._updateValue();
  }

  protected _render() {
    const inputsHTML = Array.from({ length: this.length }, (_, i) => {
      const needsSeparator = this.separator && i > 0 && i % parseInt(this.separator) === 0;
      return `
        ${needsSeparator ? '<span class="separator">-</span>' : ''}
        <input
          type="${this.type === 'password' ? 'password' : 'text'}"
          inputmode="${this.type === 'number' ? 'numeric' : 'text'}"
          class="otp-input ${this.error ? 'error' : ''}"
          part="input"
          maxlength="1"
          ${this.disabled ? 'disabled' : ''}
          aria-label="Digit ${i + 1}"
          autocomplete="off"
        />
      `;
    }).join('');

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div part="container">
        <div class="otp-container">
          ${inputsHTML}
        </div>
        ${this.error && this.errorMessage ? `
          <span class="error-message" part="error" role="alert">${this.errorMessage}</span>
        ` : ''}
      </div>
    `;

    this._attachEventListeners();

    // Set initial value if provided
    if (this.value) {
      this._setValue(this.value);
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'length':
        this.length = parseInt(newValue) || 6;
        break;
      case 'value':
        this.value = newValue || '';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'type':
        this.type = (newValue as any) || 'number';
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
      case 'separator':
        this.separator = newValue || '';
        break;
    }
  }

  // Public API
  public clear() {
    this.value = '';
    this.inputs.forEach(input => {
      input.value = '';
    });
    this.inputs[0]?.focus();
    this.emit('input', { value: '' });
  }

  public focus() {
    this.inputs[0]?.focus();
  }
}

customElements.define(OTPInput.is, OTPInput);
