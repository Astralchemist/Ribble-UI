import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.list { list-style: none; padding: 0; margin: 0; }
.list-item { padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border, #e2e8f0); }
.list-item:last-child { border-bottom: none; }
:host([variant="divided"]) .list-item { border-bottom: 1px solid var(--color-border, #e2e8f0); }
:host([variant="bordered"]) .list { border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); }
:host([hoverable]) .list-item:hover { background: var(--color-bg-hover, #f8fafc); cursor: pointer; }`;

export class List extends UIComponent {
  static is = 'ui-list';
  @property({ type: String, reflect: true }) variant: 'default' | 'divided' | 'bordered' = 'default';
  @property({ type: Boolean, reflect: true }) hoverable = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style><ul class="list" part="list" role="list"><slot></slot></ul>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'variant') this.variant = (newValue as any) || 'default';
    else if (name === 'hoverable') this.hoverable = newValue !== null;
  }
}

customElements.define(List.is, List);
