import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline; }
code { padding: 0.125rem 0.375rem; background: var(--color-bg-secondary, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-sm, 0.25rem); font-family: var(--font-mono, 'Courier New', monospace); font-size: 0.875em; color: var(--color-text, #1e293b); }`;

export class Code extends UIComponent {
  static is = 'ui-code';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <code part="code"><slot></slot></code>`;
  }
}

customElements.define(Code.is, Code);
