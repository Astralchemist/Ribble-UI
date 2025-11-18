import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --spinner-size: 2rem;
  --spinner-color: var(--color-primary, #007bff);
  --spinner-thickness: 3px;
}

.spinner {
  width: var(--spinner-size);
  height: var(--spinner-size);
  position: relative;
  display: inline-block;
}

.spinner.small {
  --spinner-size: 1rem;
  --spinner-thickness: 2px;
}

.spinner.large {
  --spinner-size: 3rem;
  --spinner-thickness: 4px;
}

.spinner.circular .spinner-circle {
  width: 100%;
  height: 100%;
  border: var(--spinner-thickness) solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--spinner-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner.dots {
  display: flex;
  align-items: center;
  gap: calc(var(--spinner-size) / 6);
}

.spinner.dots .dot {
  width: calc(var(--spinner-size) / 4);
  height: calc(var(--spinner-size) / 4);
  background: var(--spinner-color);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.spinner.dots .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.spinner.dots .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.spinner.pulse .pulse-circle {
  width: 100%;
  height: 100%;
  background: var(--spinner-color);
  border-radius: 50%;
  animation: pulse 1.2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.spinner-label {
  margin-top: var(--spacing-2, 0.5rem);
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-text-muted, #6b7280);
  text-align: center;
}
`;

export class Spinner extends UIComponent {
  static is = 'ui-spinner';

  @property({ type: String, reflect: true })
  type: 'circular' | 'dots' | 'pulse' = 'circular';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  label = '';

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'status', 'aria-live': 'polite' }
    });
  }

  protected _render() {
    const hasLabel = this.label.length > 0;

    let spinnerContent = '';
    switch (this.type) {
      case 'dots':
        spinnerContent = `
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        `;
        break;
      case 'pulse':
        spinnerContent = '<div class="pulse-circle"></div>';
        break;
      default:
        spinnerContent = '<div class="spinner-circle"></div>';
    }

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div style="display: inline-flex; flex-direction: column; align-items: center;">
        <div class="spinner ${this.type} ${this.size}" part="spinner">
          ${spinnerContent}
        </div>
        ${hasLabel ? `
          <div class="spinner-label" part="label">${this.label}</div>
        ` : ''}
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'type':
        this.type = (newValue as any) || 'circular';
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
      case 'label':
        this.label = newValue || '';
        break;
    }
  }
}

customElements.define(Spinner.is, Spinner);
