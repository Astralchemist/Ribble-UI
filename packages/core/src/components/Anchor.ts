import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }`;

export class Anchor extends UIComponent {
  static is = 'ui-anchor';
  @property({ type: String, reflect: true }) href = '';
  @property({ type: String, reflect: true }) offset = '0';

  connectedCallback() {
    super.connectedCallback();
    this._attachClickHandler();
  }

  private _attachClickHandler() {
    this.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(this.href);
      if (target) {
        const offsetValue = parseInt(this.offset);
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offsetValue;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style><slot></slot>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'href') this.href = newValue || '';
    else if (name === 'offset') this.offset = newValue || '0';
  }
}

customElements.define(Anchor.is, Anchor);
