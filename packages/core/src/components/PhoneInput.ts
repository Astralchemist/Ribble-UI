import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  max-width: 20rem;
}

.phone-container {
  position: relative;
  display: flex;
  gap: 0.5rem;
}

.country-select {
  min-width: 5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  cursor: pointer;
  transition: all 0.2s ease;
}

.country-select:hover {
  border-color: var(--color-primary, #3b82f6);
}

.country-select:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.phone-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  transition: all 0.2s ease;
}

.phone-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.phone-input::placeholder {
  color: var(--color-text-secondary, #94a3b8);
}

.phone-input.error {
  border-color: var(--color-error, #ef4444);
}

.phone-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
`;

const COUNTRIES = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
];

export class PhoneInput extends UIComponent {
  static is = 'ui-phone-input';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  countryCode = 'US';

  @property({ type: String, reflect: true })
  placeholder = 'Enter phone number';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  errorMessage = '';

  @property({ type: String, reflect: true })
  helperText = '';

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const select = this._shadow.querySelector('.country-select') as HTMLSelectElement;
    const input = this._shadow.querySelector('.phone-input') as HTMLInputElement;

    if (select) {
      select.addEventListener('change', (e) => {
        this.countryCode = (e.target as HTMLSelectElement).value;
        this.emit('country-change', { countryCode: this.countryCode });
        this._updateFullNumber();
      });
    }

    if (input) {
      input.addEventListener('input', (e) => {
        let value = (e.target as HTMLInputElement).value;
        // Format phone number: remove non-digits
        value = value.replace(/\D/g, '');
        // Format as (XXX) XXX-XXXX for US/CA
        if (this._getDialCode() === '+1' && value.length >= 3) {
          if (value.length <= 3) {
            value = `(${value}`;
          } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
          } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
          }
        }
        (e.target as HTMLInputElement).value = value;
        this.value = value;
        this._updateFullNumber();
        this.emit('input', { value: this.value, fullNumber: this.getFullNumber() });
      });

      input.addEventListener('blur', () => {
        this.emit('blur', { value: this.value, fullNumber: this.getFullNumber() });
      });
    }
  }

  private _getDialCode(): string {
    const country = COUNTRIES.find(c => c.code === this.countryCode);
    return country?.dial || '+1';
  }

  private _updateFullNumber() {
    const fullNumber = this.getFullNumber();
    this.emit('change', { value: this.value, fullNumber });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div part="container">
        <div class="phone-container">
          <select
            class="country-select"
            part="country-select"
            ${this.disabled ? 'disabled' : ''}
            aria-label="Country code"
          >
            ${COUNTRIES.map(country => `
              <option
                value="${country.code}"
                ${country.code === this.countryCode ? 'selected' : ''}
              >
                ${country.flag} ${country.dial}
              </option>
            `).join('')}
          </select>
          <input
            type="tel"
            class="phone-input ${this.error ? 'error' : ''}"
            part="input"
            value="${this.value}"
            placeholder="${this.placeholder}"
            ${this.disabled ? 'disabled' : ''}
            aria-label="Phone number"
            aria-invalid="${this.error}"
          />
        </div>
        ${this.error && this.errorMessage ? `
          <span class="error-message" part="error" role="alert">${this.errorMessage}</span>
        ` : this.helperText ? `
          <span class="helper-text" part="helper">${this.helperText}</span>
        ` : ''}
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = newValue || '';
        break;
      case 'countryCode':
        this.countryCode = newValue || 'US';
        break;
      case 'placeholder':
        this.placeholder = newValue || 'Enter phone number';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
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
  public getFullNumber(): string {
    const dialCode = this._getDialCode();
    const cleanNumber = this.value.replace(/\D/g, '');
    return cleanNumber ? `${dialCode}${cleanNumber}` : '';
  }

  public setCountry(countryCode: string) {
    this.countryCode = countryCode;
    this._render();
  }
}

customElements.define(PhoneInput.is, PhoneInput);
