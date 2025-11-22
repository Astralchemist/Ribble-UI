import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.tree { list-style: none; padding: 0; margin: 0; }
.tree-item { padding: 0.5rem; cursor: pointer; user-select: none; }
.tree-item:hover { background: var(--color-bg-hover, #f8fafc); }
.tree-children { padding-left: 1.5rem; }
.tree-icon { display: inline-block; margin-right: 0.5rem; transition: transform 0.2s; }
.tree-icon.expanded { transform: rotate(90deg); }`;

export class Tree extends UIComponent {
  static is = 'ui-tree';
  @property({ type: Boolean, reflect: true }) expandable = true;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style><ul class="tree" part="tree" role="tree"><slot></slot></ul>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'expandable') this.expandable = newValue !== null;
  }
}

customElements.define(Tree.is, Tree);
