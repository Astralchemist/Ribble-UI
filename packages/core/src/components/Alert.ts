import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --alert-padding: var(--spacing-4, 1rem);
  --alert-radius: var(--radius-md, 0.375rem);
  --alert-border-width: 1px;
}

.alert {
  padding: var(--alert-padding);
  border-radius: var(--alert-radius);
  border: var(--alert-border-width) solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3, 0.75rem);
}

.alert.info {
  background: var(--color-info-light, #e3f2fd);
  border-color: var(--color-info, #2196f3);
  color: var(--color-info-dark, #0d47a1);
}

.alert.success {
  background: var(--color-success-light, #e8f5e9);
  border-color: var(--color-success, #4caf50);
  color: var(--color-success-dark, #1b5e20);
}

.alert.warning {
  background: var(--color-warning-light, #fff3e0);
  border-color: var(--color-warning, #ff9800);
  color: var(--color-warning-dark, #e65100);
}

.alert.error {
  background: var(--color-error-light, #ffebee);
  border-color: var(--color-error, #f44336);
  color: var(--color-error-dark, #b71c1c);
}

.alert-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
}

.alert-content {
  flex: 1;
}

.alert-title {
  margin: 0 0 var(--spacing-1, 0.25rem) 0;
  font-weight: var(--font-weight-semibold, 600);
  font-size: var(--font-size-base, 1rem);
}

.alert-message {
  margin: 0;
  font-size: var(--font-size-sm, 0.875rem);
}

.alert-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.alert-close:hover {
  opacity: 1;
}
`;

export class Alert extends UIComponent {
  static is = 'ui-alert';

  @property({ type: String, reflect: true })
  type: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  message = '';

  @property({ type: Boolean, reflect: true })
  dismissible = false;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'alert' }
    });
  }

  protected _render() {
    const icons = {
      info: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>',
      success: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
      warning: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
      error: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>'
    };

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="alert ${this.type}" role="alert" part="alert">
        <div class="alert-icon" part="icon">
          ${icons[this.type]}
        </div>
        <div class="alert-content" part="content">
          ${this.title ? `
            <h4 class="alert-title" part="title">${this.title}</h4>
          ` : ''}
          ${this.message ? `
            <p class="alert-message" part="message">${this.message}</p>
          ` : ''}
          <slot></slot>
        </div>
        ${this.dismissible ? `
          <button class="alert-close" aria-label="Close alert" part="close">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        ` : ''}
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    if (this.dismissible) {
      const closeBtn = this._shadow.querySelector('.alert-close');
      closeBtn?.addEventListener('click', () => {
        this.emit('dismiss', {});
        this.remove();
      });
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'type':
        this.type = (newValue as any) || 'info';
        break;
      case 'title':
        this.title = newValue || '';
        break;
      case 'message':
        this.message = newValue || '';
        break;
      case 'dismissible':
        this.dismissible = newValue !== null;
        break;
    }
  }
}

customElements.define(Alert.is, Alert);
