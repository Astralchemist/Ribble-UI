import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.stat { padding: 1.5rem; background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); border: 1px solid var(--color-border, #e2e8f0); }
.stat-label { font-size: 0.875rem; color: var(--color-text-secondary, #64748b); margin-bottom: 0.5rem; }
.stat-value { font-size: 2rem; font-weight: 700; color: var(--color-text, #1e293b); }
.stat-change { font-size: 0.875rem; margin-top: 0.5rem; }
.stat-change.positive { color: var(--color-success, #10b981); }
.stat-change.negative { color: var(--color-error, #ef4444); }`;

export class Stat extends UIComponent {
  static is = 'ui-stat';
  @property({ type: String, reflect: true }) label = '';
  @property({ type: String, reflect: true }) value = '';
  @property({ type: String, reflect: true }) change = '';

  protected _render() {
    const changeClass = this.change.startsWith('+') ? 'positive' : this.change.startsWith('-') ? 'negative' : '';
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="stat" part="stat">
        ${this.label ? `<div class="stat-label" part="label">${this.label}</div>` : ''}
        <div class="stat-value" part="value">${this.value}</div>
        ${this.change ? `<div class="stat-change ${changeClass}" part="change">${this.change}</div>` : ''}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'label') this.label = newValue || '';
    else if (name === 'value') this.value = newValue || '';
    else if (name === 'change') this.change = newValue || '';
  }
}

customElements.define(Stat.is, Stat);
