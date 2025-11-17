import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --badge-padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem);
  --badge-font-size: var(--font-size-xs, 0.75rem);
  --badge-radius: var(--radius-full, 9999px);
  --badge-font-weight: var(--font-weight-medium, 500);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--badge-padding);
  font-size: var(--badge-font-size);
  font-weight: var(--badge-font-weight);
  border-radius: var(--badge-radius);
  line-height: 1;
  white-space: nowrap;
}

.badge.primary {
  background: var(--color-primary, #007bff);
  color: var(--color-on-primary, #fff);
}

.badge.secondary {
  background: var(--color-secondary, #6c757d);
  color: var(--color-on-secondary, #fff);
}

.badge.success {
  background: var(--color-success, #4caf50);
  color: #fff;
}

.badge.warning {
  background: var(--color-warning, #ff9800);
  color: #fff;
}

.badge.error {
  background: var(--color-error, #f44336);
  color: #fff;
}

.badge.info {
  background: var(--color-info, #2196f3);
  color: #fff;
}

.badge.outline {
  background: transparent;
  border: 1px solid currentColor;
}

.badge.outline.primary {
  color: var(--color-primary, #007bff);
}

.badge.outline.secondary {
  color: var(--color-secondary, #6c757d);
}

.badge.outline.success {
  color: var(--color-success, #4caf50);
}

.badge.outline.warning {
  color: var(--color-warning, #ff9800);
}

.badge.outline.error {
  color: var(--color-error, #f44336);
}

.badge.outline.info {
  color: var(--color-info, #2196f3);
}

.badge.dot {
  padding: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
`;

export class Badge extends UIComponent {
  static is = 'ui-badge';

  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  @property({ type: Boolean, reflect: true })
  outline = false;

  @property({ type: Boolean, reflect: true })
  dot = false;

  @property({ type: String, reflect: true })
  text = '';

  constructor() {
    super({
      shadow: { mode: 'open' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <span
        class="badge ${this.variant} ${this.outline ? 'outline' : ''} ${this.dot ? 'dot' : ''}"
        part="badge"
      >
        ${!this.dot ? (this.text || '<slot></slot>') : ''}
      </span>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'variant':
        this.variant = (newValue as any) || 'primary';
        break;
      case 'outline':
        this.outline = newValue !== null;
        break;
      case 'dot':
        this.dot = newValue !== null;
        break;
      case 'text':
        this.text = newValue || '';
        break;
    }
  }
}

customElements.define(Badge.is, Badge);
