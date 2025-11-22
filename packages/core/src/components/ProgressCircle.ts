import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; }
.progress-circle { position: relative; width: var(--size, 4rem); height: var(--size, 4rem); }
svg { transform: rotate(-90deg); }
.circle-bg { fill: none; stroke: var(--color-border, #e2e8f0); }
.circle-progress { fill: none; stroke: var(--color-primary, #3b82f6); transition: stroke-dashoffset 0.3s; }
.progress-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: 600; }`;

export class ProgressCircle extends UIComponent {
  static is = 'ui-progress-circle';
  @property({ type: Number, reflect: true }) value = 0;
  @property({ type: String, reflect: true }) size = '4rem';
  @property({ type: Number, reflect: true }) strokeWidth = 4;

  protected _render() {
    const radius = 50 - this.strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.value / 100) * circumference;
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="progress-circle" part="circle" style="--size: ${this.size};">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle class="circle-bg" cx="50" cy="50" r="${radius}" stroke-width="${this.strokeWidth}" />
          <circle class="circle-progress" cx="50" cy="50" r="${radius}" stroke-width="${this.strokeWidth}" 
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
        </svg>
        <div class="progress-text" part="text">${this.value}%</div>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'value') this.value = parseFloat(newValue) || 0;
    else if (name === 'size') this.size = newValue || '4rem';
    else if (name === 'strokeWidth') this.strokeWidth = parseFloat(newValue) || 4;
  }
}

customElements.define(ProgressCircle.is, ProgressCircle);
