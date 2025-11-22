import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; width: var(--sidenav-width, 16rem); }
.sidenav { display: flex; flex-direction: column; gap: 0.25rem; padding: 1rem; }
.nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: var(--radius-md, 0.375rem); color: var(--color-text, #1e293b); cursor: pointer; transition: all 0.2s; }
.nav-item:hover { background: var(--color-bg-secondary, #f8fafc); }
.nav-item.active { background: var(--color-primary, #3b82f6); color: white; }
.nav-section { margin-top: 1.5rem; padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary, #64748b); text-transform: uppercase; }`;

export class SideNav extends UIComponent {
  static is = 'ui-side-nav';
  @property({ type: Number, reflect: true }) active = 0;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <nav class="sidenav" part="nav" role="navigation">
        <slot></slot>
      </nav>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'active') this.active = parseInt(newValue) || 0;
  }
}

customElements.define(SideNav.is, SideNav);
