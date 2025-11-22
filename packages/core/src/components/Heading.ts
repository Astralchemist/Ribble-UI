import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
h1, h2, h3, h4, h5, h6 { margin: 0; font-weight: 700; color: var(--color-text, #1e293b); line-height: 1.2; }
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }
.gradient { background: linear-gradient(135deg, var(--color-primary, #3b82f6), var(--color-secondary, #8b5cf6)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }`;

export class Heading extends UIComponent {
  static is = 'ui-heading';
  @property({ type: Number, reflect: true }) level = 1;
  @property({ type: Boolean, reflect: true }) gradient = false;

  protected _render() {
    const tag = `h${Math.min(Math.max(this.level, 1), 6)}`;
    this._shadow.innerHTML = `<style>${style}</style>
      <${tag} class="${this.gradient ? 'gradient' : ''}" part="heading">
        <slot></slot>
      </${tag}>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'level') this.level = parseInt(newValue) || 1;
    else if (name === 'gradient') this.gradient = newValue !== null;
  }
}

customElements.define(Heading.is, Heading);
