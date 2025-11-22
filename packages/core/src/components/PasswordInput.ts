import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.password-container {
  position: relative;
  width: 100%;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 1rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  transition: all 0.2s ease;
}

.password-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-input::placeholder {
  color: var(--color-text-secondary, #94a3b8);
}

.password-input.error {
  border-color: var(--color-error, #ef4444);
}

.password-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.toggle-visibility {
  position: absolute;
  right: 0.75rem;
  padding: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary, #64748b);
  transition: all 0.2s ease;
  border-radius: var(--radius-sm, 0.25rem);
}

.toggle-visibility:hover {
  color: var(--color-text, #1e293b);
  background: var(--color-bg-secondary, #f1f5f9);
}

.toggle-visibility:focus {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: 2px;
}

.password-strength {
  margin-top: 0.75rem;
}

.strength-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
}

.strength-text {
  color: var(--color-text-secondary, #64748b);
}

.strength-value {
  font-weight: 600;
}

.strength-value.weak {
  color: var(--color-error, #ef4444);
}

.strength-value.medium {
  color: var(--color-warning, #f59e0b);
}

.strength-value.strong {
  color: var(--color-success, #10b981);
}

.strength-bar {
  height: 0.375rem;
  background: var(--color-border, #e2e8f0);
  border-radius: 9999px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 9999px;
}

.strength-fill.weak {
  width: 33%;
  background: var(--color-error, #ef4444);
}

.strength-fill.medium {
  width: 66%;
  background: var(--color-warning, #f59e0b);
}

.strength-fill.strong {
  width: 100%;
  background: var(--color-success, #10b981);
}

.requirements {
  margin-top: 0.75rem;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748b);
  margin-bottom: 0.375rem;
}

.requirement.met {
  color: var(--color-success, #10b981);
}

.requirement-icon {
  flex-shrink: 0;
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

export class PasswordInput extends UIComponent {
  static is = 'ui-password-input';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  placeholder = 'Enter password';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  showStrength = false;

  @property({ type: Boolean, reflect: true })
  showRequirements = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  errorMessage = '';

  @property({ type: String, reflect: true })
  helperText = '';

  @property({ type: Number, reflect: true })
  minLength = 8;

  private isVisible = false;

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.password-input') as HTMLInputElement;
    const toggleBtn = this._shadow.querySelector('.toggle-visibility') as HTMLButtonElement;

    if (input) {
      input.addEventListener('input', (e) => {
        this.value = (e.target as HTMLInputElement).value;
        this._render();
        this._attachEventListeners();
        this.emit('input', {
          value: this.value,
          strength: this._getPasswordStrength()
        });
      });

      input.addEventListener('change', () => {
        this.emit('change', {
          value: this.value,
          strength: this._getPasswordStrength()
        });
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isVisible = !this.isVisible;
        this._updateVisibility();
      });
    }
  }

  private _updateVisibility() {
    const input = this._shadow.querySelector('.password-input') as HTMLInputElement;
    if (input) {
      input.type = this.isVisible ? 'text' : 'password';
    }
  }

  private _getPasswordStrength(): 'weak' | 'medium' | 'strong' {
    const password = this.value;
    let strength = 0;

    if (password.length >= this.minLength) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  }

  private _checkRequirement(type: string): boolean {
    const password = this.value;
    switch (type) {
      case 'length':
        return password.length >= this.minLength;
      case 'lowercase':
        return /[a-z]/.test(password);
      case 'uppercase':
        return /[A-Z]/.test(password);
      case 'number':
        return /[0-9]/.test(password);
      case 'special':
        return /[^a-zA-Z0-9]/.test(password);
      default:
        return false;
    }
  }

  private _renderRequirement(type: string, text: string): string {
    const met = this._checkRequirement(type);
    return `
      <div class="requirement ${met ? 'met' : ''}" part="requirement">
        <svg class="requirement-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${met
            ? '<polyline points="20 6 9 17 4 12"></polyline>'
            : '<circle cx="12" cy="12" r="10"></circle>'
          }
        </svg>
        <span>${text}</span>
      </div>
    `;
  }

  protected _render() {
    const strength = this._getPasswordStrength();

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div part="container">
        <div class="password-container">
          <div class="password-input-wrapper">
            <input
              type="${this.isVisible ? 'text' : 'password'}"
              class="password-input ${this.error ? 'error' : ''}"
              part="input"
              value="${this.value}"
              placeholder="${this.placeholder}"
              ${this.disabled ? 'disabled' : ''}
              aria-label="Password"
              autocomplete="current-password"
            />
            <button
              class="toggle-visibility"
              part="toggle"
              aria-label="${this.isVisible ? 'Hide password' : 'Show password'}"
              tabindex="0"
            >
              ${this.isVisible ? `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ` : `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              `}
            </button>
          </div>
        </div>

        ${this.showStrength && this.value ? `
          <div class="password-strength" part="strength">
            <div class="strength-label">
              <span class="strength-text">Password strength:</span>
              <span class="strength-value ${strength}">${strength.charAt(0).toUpperCase() + strength.slice(1)}</span>
            </div>
            <div class="strength-bar">
              <div class="strength-fill ${strength}"></div>
            </div>
          </div>
        ` : ''}

        ${this.showRequirements ? `
          <div class="requirements" part="requirements">
            ${this._renderRequirement('length', `At least ${this.minLength} characters`)}
            ${this._renderRequirement('lowercase', 'One lowercase letter')}
            ${this._renderRequirement('uppercase', 'One uppercase letter')}
            ${this._renderRequirement('number', 'One number')}
            ${this._renderRequirement('special', 'One special character')}
          </div>
        ` : ''}

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
      case 'placeholder':
        this.placeholder = newValue || 'Enter password';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'showStrength':
        this.showStrength = newValue !== null;
        break;
      case 'showRequirements':
        this.showRequirements = newValue !== null;
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
      case 'minLength':
        this.minLength = parseInt(newValue) || 8;
        break;
    }
  }

  // Public API
  public getStrength(): 'weak' | 'medium' | 'strong' {
    return this._getPasswordStrength();
  }

  public isValid(): boolean {
    return this._checkRequirement('length') &&
           this._checkRequirement('lowercase') &&
           this._checkRequirement('uppercase') &&
           this._checkRequirement('number') &&
           this._checkRequirement('special');
  }
}

customElements.define(PasswordInput.is, PasswordInput);
