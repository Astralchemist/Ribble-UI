import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; position: relative; }
.dropdown-toggle { cursor: pointer; }
.dropdown-menu { position: absolute; top: 100%; left: 0; z-index: 50; min-width: 12rem; margin-top: 0.5rem; padding: 0.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 10px 25px rgba(0,0,0,0.1); opacity: 0; visibility: hidden; transition: all 0.2s; }
.dropdown-menu.open { opacity: 1; visibility: visible; }
.dropdown-item { padding: 0.5rem 0.75rem; border-radius: var(--radius-sm, 0.25rem); cursor: pointer; transition: all 0.2s; }
.dropdown-item:hover { background: var(--color-bg-hover, #f1f5f9); }`;

export class Dropdown extends UIComponent {
  static is = 'ui-dropdown';
  @property({ type: Boolean, reflect: true }) open = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="dropdown-toggle" part="toggle"><slot name="trigger"></slot></div>
      <div class="dropdown-menu ${this.open ? 'open' : ''}" part="menu" role="menu">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'open') this.open = newValue !== null;
  }
}

customElements.define(Dropdown.is, Dropdown);
