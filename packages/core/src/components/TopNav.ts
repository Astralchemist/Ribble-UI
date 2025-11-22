import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.topnav { display: flex; align-items: center; padding: 1rem 1.5rem; background: var(--color-surface, #fff); border-bottom: 1px solid var(--color-border, #e2e8f0); }
.nav-brand { font-size: 1.25rem; font-weight: 600; margin-right: auto; }
.nav-items { display: flex; gap: 0.5rem; }
.nav-item { padding: 0.5rem 1rem; color: var(--color-text, #1e293b); text-decoration: none; border-radius: var(--radius-md, 0.375rem); transition: all 0.2s; }
.nav-item:hover { background: var(--color-bg-secondary, #f8fafc); }
.nav-item.active { background: var(--color-primary, #3b82f6); color: white; }`;

export class TopNav extends UIComponent {
  static is = 'ui-top-nav';
  @property({ type: String, reflect: true }) brand = '';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <nav class="topnav" part="nav" role="navigation">
        ${this.brand ? `<div class="nav-brand" part="brand">${this.brand}</div>` : ''}
        <div class="nav-items" part="items"><slot></slot></div>
      </nav>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'brand') this.brand = newValue || '';
  }
}

customElements.define(TopNav.is, TopNav);
