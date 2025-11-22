import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: contents; }
.context-menu { position: fixed; z-index: 100; min-width: 12rem; padding: 0.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 10px 25px rgba(0,0,0,0.1); opacity: 0; visibility: hidden; transition: all 0.15s; }
.context-menu.open { opacity: 1; visibility: visible; }
.context-item { padding: 0.5rem 0.75rem; border-radius: var(--radius-sm, 0.25rem); cursor: pointer; font-size: 0.875rem; }
.context-item:hover { background: var(--color-bg-hover, #f1f5f9); }
.context-divider { height: 1px; background: var(--color-border, #e2e8f0); margin: 0.25rem 0; }`;

export class ContextMenu extends UIComponent {
  static is = 'ui-context-menu';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number, reflect: true }) x = 0;
  @property({ type: Number, reflect: true }) y = 0;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="context-menu ${this.open ? 'open' : ''}" part="menu" role="menu" style="left: ${this.x}px; top: ${this.y}px;">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'open') this.open = newValue !== null;
    else if (name === 'x') this.x = parseFloat(newValue) || 0;
    else if (name === 'y') this.y = parseFloat(newValue) || 0;
  }
}

customElements.define(ContextMenu.is, ContextMenu);
