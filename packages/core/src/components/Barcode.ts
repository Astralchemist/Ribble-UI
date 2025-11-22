import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; }
.barcode { padding: 1rem; background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); display: inline-flex; flex-direction: column; align-items: center; gap: 0.5rem; }
svg { display: block; }
.barcode-value { font-family: var(--font-mono, monospace); font-size: 0.875rem; }`;

export class Barcode extends UIComponent {
  static is = 'ui-barcode';
  @property({ type: String, reflect: true }) value = '';
  @property({ type: Number, reflect: true }) width = 200;
  @property({ type: Number, reflect: true }) height = 50;

  protected _render() {
    // Simple barcode visualization (real implementation would use a barcode library)
    const bars = this.value.split('').map((_, i) => (i % 2 === 0 ? 10 : 5)).join(',');
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="barcode" part="barcode">
        <svg width="${this.width}" height="${this.height}" part="svg">
          ${this.value.split('').map((_, i) => `
            <rect x="${i * 12}" y="0" width="${i % 2 === 0 ? 10 : 5}" height="${this.height}" fill="#000"/>
          `).join('')}
        </svg>
        <div class="barcode-value" part="value">${this.value}</div>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'value') this.value = newValue || '';
    else if (name === 'width') this.width = parseInt(newValue) || 200;
    else if (name === 'height') this.height = parseInt(newValue) || 50;
  }
}

customElements.define(Barcode.is, Barcode);
