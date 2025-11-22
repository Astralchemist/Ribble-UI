import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: none; }
:host([open]) { display: block; position: fixed; inset: 0; z-index: 50; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); }
.dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 20px 50px rgba(0,0,0,0.3); max-width: 24rem; width: 90%; padding: 1.5rem; }
.dialog-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; }
.dialog-message { font-size: 0.875rem; color: var(--color-text-secondary, #64748b); margin-bottom: 1.5rem; }
.dialog-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
.btn { padding: 0.5rem 1rem; border-radius: var(--radius-md, 0.375rem); border: none; cursor: pointer; font-weight: 500; }
.btn-cancel { background: var(--color-bg-secondary, #f1f5f9); }
.btn-confirm { background: var(--color-primary, #3b82f6); color: white; }`;

export class ConfirmDialog extends UIComponent {
  static is = 'ui-confirm-dialog';
  @property({ type: String, reflect: true }) title = 'Confirm';
  @property({ type: String, reflect: true }) message = 'Are you sure?';
  @property({ type: Boolean, reflect: true }) open = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="overlay" part="overlay"></div>
      <div class="dialog" part="dialog" role="alertdialog">
        <h3 class="dialog-title" part="title">${this.title}</h3>
        <p class="dialog-message" part="message">${this.message}</p>
        <div class="dialog-actions" part="actions">
          <button class="btn btn-cancel" part="cancel">Cancel</button>
          <button class="btn btn-confirm" part="confirm">Confirm</button>
        </div>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue || 'Confirm';
    else if (name === 'message') this.message = newValue || 'Are you sure?';
    else if (name === 'open') this.open = newValue !== null;
  }
}

customElements.define(ConfirmDialog.is, ConfirmDialog);
