import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: sticky; top: 2rem; }
.scrollspy { list-style: none; padding: 0; margin: 0; }
.scrollspy-item { padding: 0.5rem 1rem; border-left: 2px solid var(--color-border, #e2e8f0); color: var(--color-text-secondary, #64748b); cursor: pointer; transition: all 0.2s; }
.scrollspy-item:hover { border-left-color: var(--color-primary, #3b82f6); color: var(--color-text, #1e293b); }
.scrollspy-item.active { border-left-color: var(--color-primary, #3b82f6); color: var(--color-primary, #3b82f6); font-weight: 600; }`;

export class ScrollSpy extends UIComponent {
  static is = 'ui-scroll-spy';
  @property({ type: Number, reflect: true }) active = 0;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <ul class="scrollspy" part="scrollspy" role="navigation">
        <slot></slot>
      </ul>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'active') this.active = parseInt(newValue) || 0;
  }
}

customElements.define(ScrollSpy.is, ScrollSpy);
