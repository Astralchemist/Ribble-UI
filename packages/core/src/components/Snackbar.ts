import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 50; }
.snackbar { padding: 1rem 1.5rem; background: var(--color-text, #1e293b); color: white; border-radius: var(--radius-md, 0.375rem); box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 1rem; }
.snackbar-message { font-size: 0.875rem; }
.snackbar-action { background: none; border: none; color: var(--color-primary, #60a5fa); cursor: pointer; font-weight: 600; }`;

export class Snackbar extends UIComponent {
  static is = 'ui-snackbar';
  @property({ type: String, reflect: true }) message = '';
  @property({ type: String, reflect: true }) action = '';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="snackbar" part="snackbar" role="status">
        <div class="snackbar-message" part="message">${this.message}<slot></slot></div>
        ${this.action ? `<button class="snackbar-action" part="action">${this.action}</button>` : ''}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'message') this.message = newValue || '';
    else if (name === 'action') this.action = newValue || '';
  }
}

customElements.define(Snackbar.is, Snackbar);
