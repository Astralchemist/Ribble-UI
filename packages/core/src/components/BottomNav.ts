import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: fixed; bottom: 0; left: 0; right: 0; z-index: 30; }
.bottomnav { display: flex; justify-content: space-around; padding: 0.75rem 0; background: var(--color-surface, #fff); border-top: 1px solid var(--color-border, #e2e8f0); box-shadow: 0 -2px 10px rgba(0,0,0,0.05); }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 0.5rem 1rem; cursor: pointer; color: var(--color-text-secondary, #64748b); transition: all 0.2s; }
.nav-item.active { color: var(--color-primary, #3b82f6); }
.nav-icon { font-size: 1.25rem; }
.nav-label { font-size: 0.75rem; font-weight: 500; }`;

export class BottomNav extends UIComponent {
  static is = 'ui-bottom-nav';
  @property({ type: Number, reflect: true }) active = 0;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <nav class="bottomnav" part="nav" role="navigation">
        <slot></slot>
      </nav>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'active') this.active = parseInt(newValue) || 0;
  }
}

customElements.define(BottomNav.is, BottomNav);
