import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; }
.qrcode { padding: 1rem; background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); display: inline-block; }
canvas { display: block; }`;

export class QRCode extends UIComponent {
  static is = 'ui-qr-code';
  @property({ type: String, reflect: true }) value = '';
  @property({ type: Number, reflect: true }) size = 128;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="qrcode" part="qrcode">
        <canvas width="${this.size}" height="${this.size}" part="canvas"></canvas>
      </div>`;
    this._generateQR();
  }

  private _generateQR() {
    const canvas = this._shadow.querySelector('canvas');
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;
    
    // Simple QR placeholder (real implementation would use a QR library)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText('QR: ' + this.value.substring(0, 10), 10, this.size / 2);
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'value') this.value = newValue || '';
    else if (name === 'size') this.size = parseInt(newValue) || 128;
  }
}

customElements.define(QRCode.is, QRCode);
