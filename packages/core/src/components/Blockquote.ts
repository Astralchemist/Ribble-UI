import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
blockquote { margin: 0; padding: 1rem 1.5rem; border-left: 4px solid var(--color-primary, #3b82f6); background: var(--color-bg-secondary, #f8fafc); border-radius: var(--radius-md, 0.375rem); font-style: italic; }
blockquote p { margin: 0 0 0.5rem 0; }
blockquote p:last-child { margin-bottom: 0; }
cite { display: block; margin-top: 0.75rem; font-size: 0.875rem; color: var(--color-text-secondary, #64748b); font-style: normal; }
cite::before { content: '— '; }`;

export class Blockquote extends UIComponent {
  static is = 'ui-blockquote';
  @property({ type: String, reflect: true }) cite = '';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <blockquote part="blockquote">
        <slot></slot>
        ${this.cite ? `<cite part="cite">${this.cite}</cite>` : ''}
      </blockquote>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'cite') this.cite = newValue || '';
  }
}

customElements.define(Blockquote.is, Blockquote);
