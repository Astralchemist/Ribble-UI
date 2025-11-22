import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: fixed; top: 1rem; right: 1rem; z-index: 50; }
.notification { min-width: 20rem; padding: 1rem 1.5rem; background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-left: 4px solid var(--notif-color, var(--color-primary, #3b82f6)); }
.notification-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
.notification-title { font-weight: 600; color: var(--color-text, #1e293b); }
.close-btn { background: none; border: none; cursor: pointer; padding: 0.25rem; }
.notification-message { font-size: 0.875rem; color: var(--color-text-secondary, #64748b); }
:host([type="success"]) .notification { border-left-color: var(--color-success, #10b981); }
:host([type="error"]) .notification { border-left-color: var(--color-error, #ef4444); }
:host([type="warning"]) .notification { border-left-color: var(--color-warning, #f59e0b); }`;

export class Notification extends UIComponent {
  static is = 'ui-notification';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: String, reflect: true }) message = '';
  @property({ type: String, reflect: true }) type: 'info' | 'success' | 'error' | 'warning' = 'info';
  @property({ type: Boolean, reflect: true }) closable = true;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="notification" part="notification" role="alert">
        <div class="notification-header">
          ${this.title ? `<div class="notification-title" part="title">${this.title}</div>` : ''}
          ${this.closable ? '<button class="close-btn" part="close" aria-label="Close">×</button>' : ''}
        </div>
        ${this.message ? `<div class="notification-message" part="message">${this.message}</div>` : ''}
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue || '';
    else if (name === 'message') this.message = newValue || '';
    else if (name === 'type') this.type = (newValue as any) || 'info';
    else if (name === 'closable') this.closable = newValue !== null;
  }
}

customElements.define(Notification.is, Notification);
