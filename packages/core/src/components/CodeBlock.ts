import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.codeblock { position: relative; background: var(--color-bg-dark, #1e293b); border-radius: var(--radius-md, 0.375rem); overflow: hidden; }
.codeblock-header { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: rgba(0,0,0,0.2); }
.codeblock-lang { font-size: 0.75rem; color: var(--color-text-light, #94a3b8); text-transform: uppercase; }
.copy-btn { padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(255,255,255,0.1); color: white; border: none; border-radius: var(--radius-sm, 0.25rem); cursor: pointer; }
.copy-btn:hover { background: rgba(255,255,255,0.2); }
pre { margin: 0; padding: 1rem; overflow-x: auto; }
code { color: var(--color-text-light, #f1f5f9); font-family: var(--font-mono, monospace); font-size: 0.875rem; line-height: 1.5; }`;

export class CodeBlock extends UIComponent {
  static is = 'ui-code-block';
  @property({ type: String, reflect: true }) language = '';
  @property({ type: String, reflect: true }) code = '';
  @property({ type: Boolean, reflect: true }) copyable = true;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="codeblock" part="codeblock">
        ${this.language || this.copyable ? `
          <div class="codeblock-header" part="header">
            <span class="codeblock-lang">${this.language}</span>
            ${this.copyable ? '<button class="copy-btn" part="copy">Copy</button>' : ''}
          </div>
        ` : ''}
        <pre part="pre"><code part="code">${this.code || '<slot></slot>'}</code></pre>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'language') this.language = newValue || '';
    else if (name === 'code') this.code = newValue || '';
    else if (name === 'copyable') this.copyable = newValue !== null;
  }
}

customElements.define(CodeBlock.is, CodeBlock);
