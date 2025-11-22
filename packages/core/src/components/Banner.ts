import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.banner { padding: 1rem 1.5rem; background: var(--color-bg-secondary, #f8fafc); border-left: 4px solid var(--color-primary, #3b82f6); border-radius: var(--radius-md, 0.375rem); display: flex; align-items: start; gap: 1rem; }
.banner.info { border-left-color: var(--color-primary, #3b82f6); background: rgba(59, 130, 246, 0.1); }
.banner.success { border-left-color: var(--color-success, #10b981); background: rgba(16, 185, 129, 0.1); }
.banner.warning { border-left-color: var(--color-warning, #f59e0b); background: rgba(245, 158, 11, 0.1); }
.banner.error { border-left-color: var(--color-error, #ef4444); background: rgba(239, 68, 68, 0.1); }
.banner-content { flex: 1; }
.banner-title { font-weight: 600; margin-bottom: 0.25rem; }
.banner-message { font-size: 0.875rem; color: var(--color-text-secondary, #64748b); }
.close-btn { background: none; border: none; cursor: pointer; padding: 0.25rem; }`;

export class Banner extends UIComponent {
  static is = 'ui-banner';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: String, reflect: true }) message = '';
  @property({ type: String, reflect: true }) type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @property({ type: Boolean, reflect: true }) closable = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="banner ${this.type}" part="banner" role="alert">
        <div class="banner-content" part="content">
          ${this.title ? `<div class="banner-title" part="title">${this.title}</div>` : ''}
          ${this.message ? `<div class="banner-message" part="message">${this.message}</div>` : ''}
          <slot></slot>
        </div>
        ${this.closable ? '<button class="close-btn" part="close" aria-label="Close">×</button>' : ''}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue || '';
    else if (name === 'message') this.message = newValue || '';
    else if (name === 'type') this.type = (newValue as any) || 'info';
    else if (name === 'closable') this.closable = newValue !== null;
  }
}

customElements.define(Banner.is, Banner);
