import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline; }
mark { background: var(--highlight-bg, #fef08a); color: var(--highlight-color, #1e293b); padding: 0.125rem 0.25rem; border-radius: var(--radius-sm, 0.25rem); }
mark.primary { background: rgba(59, 130, 246, 0.2); color: var(--color-primary, #3b82f6); }
mark.success { background: rgba(16, 185, 129, 0.2); color: var(--color-success, #10b981); }
mark.warning { background: rgba(245, 158, 11, 0.2); color: var(--color-warning, #f59e0b); }
mark.error { background: rgba(239, 68, 68, 0.2); color: var(--color-error, #ef4444); }`;

export class Highlight extends UIComponent {
  static is = 'ui-highlight';
  @property({ type: String, reflect: true }) color: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <mark class="${this.color !== 'default' ? this.color : ''}" part="highlight">
        <slot></slot>
      </mark>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'color') this.color = (newValue as any) || 'default';
  }
}

customElements.define(Highlight.is, Highlight);
