import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.collapse { overflow: hidden; transition: height 0.3s ease; }
.collapse.closed { height: 0; }`;

export class Collapse extends UIComponent {
  static is = 'ui-collapse';
  @property({ type: Boolean, reflect: true }) open = true;

  protected _render() {
    const closedClass = !this.open ? 'closed' : '';
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="collapse ${closedClass}" part="collapse">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'open') this.open = newValue !== null;
  }
}

customElements.define(Collapse.is, Collapse);
