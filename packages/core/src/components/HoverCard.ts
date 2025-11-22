import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; position: relative; }
.hovercard-content { position: absolute; z-index: 50; padding: 1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 10px 25px rgba(0,0,0,0.1); min-width: 16rem; opacity: 0; visibility: hidden; transition: all 0.2s; pointer-events: none; }
:host(:hover) .hovercard-content { opacity: 1; visibility: visible; pointer-events: auto; }
.hovercard-content.top { bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-0.5rem); }
.hovercard-content.bottom { top: 100%; left: 50%; transform: translateX(-50%) translateY(0.5rem); }`;

export class HoverCard extends UIComponent {
  static is = 'ui-hover-card';
  @property({ type: String, reflect: true }) placement: 'top' | 'bottom' = 'bottom';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <slot name="trigger"></slot>
      <div class="hovercard-content ${this.placement}" part="content" role="tooltip">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'placement') this.placement = (newValue as any) || 'bottom';
  }
}

customElements.define(HoverCard.is, HoverCard);
