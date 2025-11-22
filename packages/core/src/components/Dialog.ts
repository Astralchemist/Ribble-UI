import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: none; }
:host([open]) { display: block; position: fixed; inset: 0; z-index: 50; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); }
.dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 20px 50px rgba(0,0,0,0.3); max-width: 32rem; width: 90%; max-height: 90vh; overflow: auto; }
.dialog-header { padding: 1.5rem; border-bottom: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center; }
.dialog-title { font-size: 1.125rem; font-weight: 600; }
.close-btn { background: none; border: none; cursor: pointer; font-size: 1.5rem; }
.dialog-content { padding: 1.5rem; }
.dialog-footer { padding: 1.5rem; border-top: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: flex-end; gap: 0.5rem; }`;

export class Dialog extends UIComponent {
  static is = 'ui-dialog';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: Boolean, reflect: true }) open = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="overlay" part="overlay"></div>
      <div class="dialog" part="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div class="dialog-header" part="header">
          <h2 class="dialog-title" id="dialog-title" part="title">${this.title}</h2>
          <button class="close-btn" part="close" aria-label="Close">×</button>
        </div>
        <div class="dialog-content" part="content"><slot></slot></div>
        <div class="dialog-footer" part="footer"><slot name="footer"></slot></div>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue || '';
    else if (name === 'open') this.open = newValue !== null;
  }
}

customElements.define(Dialog.is, Dialog);
