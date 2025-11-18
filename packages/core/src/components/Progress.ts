import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --progress-height: 0.75rem;
  --progress-bg: var(--color-surface-hover, #e5e7eb);
  --progress-fill-bg: var(--color-primary, #007bff);
  --progress-radius: var(--radius-full, 9999px);
  --progress-text-color: var(--color-text, #1a1a1a);
}

.progress-wrapper {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2, 0.5rem);
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--progress-text-color);
}

.progress-track {
  width: 100%;
  height: var(--progress-height);
  background: var(--progress-bg);
  border-radius: var(--progress-radius);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--progress-fill-bg);
  border-radius: var(--progress-radius);
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill.animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-fill.striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-fill.success {
  background: var(--color-success, #4caf50);
}

.progress-fill.warning {
  background: var(--color-warning, #ff9800);
}

.progress-fill.error {
  background: var(--color-error, #f44336);
}
`;

export class Progress extends UIComponent {
  static is = 'ui-progress';

  @property({ type: Number, reflect: true })
  value = 0;

  @property({ type: Number, reflect: true })
  max = 100;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  showValue = false;

  @property({ type: Boolean, reflect: true })
  striped = false;

  @property({ type: Boolean, reflect: true })
  animated = false;

  @property({ type: String, reflect: true })
  variant: 'default' | 'success' | 'warning' | 'error' = 'default';

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'progressbar' }
    });
  }

  protected _render() {
    const percentage = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    const hasLabel = this.label.length > 0 || this.showValue;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="progress-wrapper" part="wrapper">
        ${hasLabel ? `
          <div class="progress-label" part="label">
            <span>${this.label}</span>
            ${this.showValue ? `<span>${Math.round(percentage)}%</span>` : ''}
          </div>
        ` : ''}
        <div class="progress-track" part="track">
          <div
            class="progress-fill ${this.striped ? 'striped' : ''} ${this.animated ? 'animated' : ''} ${this.variant !== 'default' ? this.variant : ''}"
            style="width: ${percentage}%"
            role="progressbar"
            aria-valuenow="${this.value}"
            aria-valuemin="0"
            aria-valuemax="${this.max}"
            part="fill"
          ></div>
        </div>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = parseFloat(newValue) || 0;
        break;
      case 'max':
        this.max = parseFloat(newValue) || 100;
        break;
      case 'label':
        this.label = newValue || '';
        break;
      case 'show-value':
        this.showValue = newValue !== null;
        break;
      case 'striped':
        this.striped = newValue !== null;
        break;
      case 'animated':
        this.animated = newValue !== null;
        break;
      case 'variant':
        this.variant = (newValue as any) || 'default';
        break;
    }
  }
}

customElements.define(Progress.is, Progress);
