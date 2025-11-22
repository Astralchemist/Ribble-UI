import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline; }
a { color: var(--color-primary, #3b82f6); text-decoration: underline; cursor: pointer; transition: all 0.2s; }
a:hover { color: var(--color-primary-dark, #2563eb); }
a.no-underline { text-decoration: none; }
a.subtle { color: var(--color-text, #1e293b); }
a.subtle:hover { color: var(--color-primary, #3b82f6); }`;

export class Link extends UIComponent {
  static is = 'ui-link';
  @property({ type: String, reflect: true }) href = '';
  @property({ type: String, reflect: true }) target = '';
  @property({ type: Boolean, reflect: true }) external = false;
  @property({ type: Boolean, reflect: true }) noUnderline = false;
  @property({ type: Boolean, reflect: true }) subtle = false;

  protected _render() {
    const classes = ['no-underline', this.subtle && 'subtle'].filter(Boolean).join(' ');
    this._shadow.innerHTML = `<style>${style}</style>
      <a href="${this.href}" 
         ${this.target ? `target="${this.target}"` : ''} 
         ${this.external ? 'rel="noopener noreferrer"' : ''}
         class="${this.noUnderline ? classes : (this.subtle ? 'subtle' : '')}"
         part="link">
        <slot></slot>
      </a>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'href') this.href = newValue || '';
    else if (name === 'target') this.target = newValue || '';
    else if (name === 'external') this.external = newValue !== null;
    else if (name === 'noUnderline') this.noUnderline = newValue !== null;
    else if (name === 'subtle') this.subtle = newValue !== null;
  }
}

customElements.define(Link.is, Link);
