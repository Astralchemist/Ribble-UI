import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.sticky { position: sticky; top: var(--sticky-top, 0); z-index: var(--sticky-z, 10); }`;

export class Sticky extends UIComponent {
  static is = 'ui-sticky';
  @property({ type: String, reflect: true }) top = '0';
  @property({ type: Number, reflect: true }) zIndex = 10;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="sticky" part="sticky" style="--sticky-top: ${this.top}; --sticky-z: ${this.zIndex};">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'top') this.top = newValue || '0';
    else if (name === 'zIndex') this.zIndex = parseInt(newValue) || 10;
  }
}

customElements.define(Sticky.is, Sticky);
