import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-flex; }
.avatar-group { display: inline-flex; }
::slotted(*) { margin-left: -0.5rem; border: 2px solid var(--color-surface, #fff); }
::slotted(*:first-child) { margin-left: 0; }
.avatar-count { display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--color-border, #e2e8f0); color: var(--color-text, #1e293b); font-size: 0.875rem; font-weight: 600; margin-left: -0.5rem; border: 2px solid var(--color-surface, #fff); }`;

export class AvatarGroup extends UIComponent {
  static is = 'ui-avatar-group';
  @property({ type: Number, reflect: true }) max = 0;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="avatar-group" part="group">
        <slot></slot>
        ${this.max > 0 ? `<div class="avatar-count" part="count">+${this.max}</div>` : ''}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'max') this.max = parseInt(newValue) || 0;
  }
}

customElements.define(AvatarGroup.is, AvatarGroup);
