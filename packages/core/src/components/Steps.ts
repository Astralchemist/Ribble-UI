import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.steps { display: flex; align-items: center; padding: 1rem 0; }
.step { display: flex; align-items: center; flex: 1; }
.step-number { width: 2rem; height: 2rem; border-radius: 50%; background: var(--color-border, #e2e8f0); color: var(--color-text-secondary, #64748b); display: flex; align-items: center; justify-content: center; font-weight: 600; }
.step.active .step-number { background: var(--color-primary, #3b82f6); color: white; }
.step.complete .step-number { background: var(--color-success, #10b981); color: white; }
.step-line { flex: 1; height: 2px; background: var(--color-border, #e2e8f0); margin: 0 0.5rem; }
.step.complete .step-line { background: var(--color-success, #10b981); }
.step:last-child .step-line { display: none; }`;

export class Steps extends UIComponent {
  static is = 'ui-steps';
  @property({ type: Number, reflect: true }) current = 0;
  @property({ type: Number, reflect: true }) total = 3;

  protected _render() {
    const steps = Array.from({ length: this.total }, (_, i) => i);
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="steps" part="steps">
        ${steps.map(i => `
          <div class="step ${i === this.current ? 'active' : ''} ${i < this.current ? 'complete' : ''}" part="step">
            <div class="step-number">${i < this.current ? '✓' : i + 1}</div>
            <div class="step-line"></div>
          </div>
        `).join('')}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'current') this.current = parseInt(newValue) || 0;
    else if (name === 'total') this.total = parseInt(newValue) || 3;
  }
}

customElements.define(Steps.is, Steps);
