import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.chart { padding: 1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); }
.chart-title { font-weight: 600; margin-bottom: 1rem; }
canvas { width: 100%; height: auto; }`;

export class Chart extends UIComponent {
  static is = 'ui-chart';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: String, reflect: true }) type: 'bar' | 'line' | 'pie' = 'bar';
  @property({ type: String, reflect: true }) data = '';
  @property({ type: Number, reflect: true }) width = 400;
  @property({ type: Number, reflect: true }) height = 300;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="chart" part="chart">
        ${this.title ? `<div class="chart-title" part="title">${this.title}</div>` : ''}
        <canvas width="${this.width}" height="${this.height}" part="canvas"></canvas>
      </div>`;
    this._renderChart();
  }

  private _renderChart() {
    const canvas = this._shadow.querySelector('canvas');
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;
    
    // Simple chart placeholder (real implementation would use a chart library)
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(50, 50, 100, 200);
    ctx.fillRect(200, 100, 100, 150);
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue || '';
    else if (name === 'type') this.type = (newValue as any) || 'bar';
    else if (name === 'data') this.data = newValue || '';
    else if (name === 'width') this.width = parseInt(newValue) || 400;
    else if (name === 'height') this.height = parseInt(newValue) || 300;
  }
}

customElements.define(Chart.is, Chart);
