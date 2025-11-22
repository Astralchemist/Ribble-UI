import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 1rem; text-align: center; }
.empty-icon { width: 4rem; height: 4rem; margin-bottom: 1rem; color: var(--color-text-secondary, #94a3b8); }
.empty-title { font-size: 1.125rem; font-weight: 600; color: var(--color-text, #1e293b); margin-bottom: 0.5rem; }
.empty-description { font-size: 0.875rem; color: var(--color-text-secondary, #64748b); margin-bottom: 1.5rem; }`;

export class Empty extends UIComponent {
  static is = 'ui-empty';
  @property({ type: String, reflect: true }) title = 'No data';
  @property({ type: String, reflect: true }) description = '';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="empty" part="empty">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="empty-title" part="title">${this.title}</div>
        ${this.description ? `<div class="empty-description" part="description">${this.description}</div>` : ''}
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue || 'No data';
    else if (name === 'description') this.description = newValue || '';
  }
}

customElements.define(Empty.is, Empty);
