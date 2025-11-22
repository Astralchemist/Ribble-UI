import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: none; }`;

export class Portal extends UIComponent {
  static is = 'ui-portal';
  @property({ type: String, reflect: true }) target = 'body';
  private portalContainer: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._createPortal();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.portalContainer) this.portalContainer.remove();
  }

  private _createPortal() {
    const targetEl = document.querySelector(this.target);
    if (!targetEl) return;

    this.portalContainer = document.createElement('div');
    this.portalContainer.innerHTML = this.innerHTML;
    targetEl.appendChild(this.portalContainer);
  }

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'target') this.target = newValue || 'body';
  }
}

customElements.define(Portal.is, Portal);
