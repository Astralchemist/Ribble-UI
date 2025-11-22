import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline; }
.text { margin: 0; }
.text.small { font-size: 0.875rem; }
.text.base { font-size: 1rem; }
.text.large { font-size: 1.125rem; }
.text.muted { color: var(--color-text-secondary, #64748b); }
.text.bold { font-weight: 600; }
.text.italic { font-style: italic; }
.text.underline { text-decoration: underline; }
.text.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`;

export class Text extends UIComponent {
  static is = 'ui-text';
  @property({ type: String, reflect: true }) size: 'small' | 'base' | 'large' = 'base';
  @property({ type: Boolean, reflect: true }) muted = false;
  @property({ type: Boolean, reflect: true }) bold = false;
  @property({ type: Boolean, reflect: true }) italic = false;
  @property({ type: Boolean, reflect: true }) underline = false;
  @property({ type: Boolean, reflect: true }) truncate = false;

  protected _render() {
    const classes = ['text', this.size, this.muted && 'muted', this.bold && 'bold', 
      this.italic && 'italic', this.underline && 'underline', this.truncate && 'truncate'].filter(Boolean).join(' ');
    this._shadow.innerHTML = `<style>${style}</style>
      <span class="${classes}" part="text"><slot></slot></span>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'size') this.size = (newValue as any) || 'base';
    else if (name === 'muted') this.muted = newValue !== null;
    else if (name === 'bold') this.bold = newValue !== null;
    else if (name === 'italic') this.italic = newValue !== null;
    else if (name === 'underline') this.underline = newValue !== null;
    else if (name === 'truncate') this.truncate = newValue !== null;
  }
}

customElements.define(Text.is, Text);
