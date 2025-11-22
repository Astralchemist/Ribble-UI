import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; }
.kbd { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.125rem 0.375rem; background: var(--color-bg-secondary, #f8fafc); border: 1px solid var(--color-border, #cbd5e1); border-radius: var(--radius-sm, 0.25rem); font-family: var(--font-mono, monospace); font-size: 0.875rem; color: var(--color-text, #1e293b); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }`;

export class Kbd extends UIComponent {
  static is = 'ui-kbd';
  @property({ type: String, reflect: true }) keys = '';

  protected _render() {
    const keyList = this.keys.split('+').map(k => k.trim());
    this._shadow.innerHTML = `<style>${style}</style>
      <kbd class="kbd" part="kbd">
        ${keyList.map(key => `<span>${key}</span>`).join('<span>+</span>')}
      </kbd>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'keys') this.keys = newValue || '';
  }
}

customElements.define(Kbd.is, Kbd);
