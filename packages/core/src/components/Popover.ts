import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; position: relative; }
.popover-content { position: absolute; z-index: 50; padding: 0.75rem 1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 10px 25px rgba(0,0,0,0.1); min-width: 12rem; opacity: 0; visibility: hidden; transition: all 0.2s; }
.popover-content.open { opacity: 1; visibility: visible; }
.popover-content.top { bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-0.5rem); }
.popover-content.bottom { top: 100%; left: 50%; transform: translateX(-50%) translateY(0.5rem); }
.popover-content.left { right: 100%; top: 50%; transform: translateY(-50%) translateX(-0.5rem); }
.popover-content.right { left: 100%; top: 50%; transform: translateY(-50%) translateX(0.5rem); }`;

export class Popover extends UIComponent {
  static is = 'ui-popover';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <slot name="trigger"></slot>
      <div class="popover-content ${this.placement} ${this.open ? 'open' : ''}" part="content" role="tooltip">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'open') this.open = newValue !== null;
    else if (name === 'placement') this.placement = (newValue as any) || 'bottom';
  }
}

customElements.define(Popover.is, Popover);
