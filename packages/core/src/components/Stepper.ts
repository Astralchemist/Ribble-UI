import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.stepper { display: flex; align-items: center; }
.step { display: flex; align-items: center; flex: 1; }
.step-marker { width: 2rem; height: 2rem; border-radius: 50%; background: var(--color-border, #e2e8f0); color: var(--color-text-secondary, #64748b); display: flex; align-items: center; justify-content: center; font-weight: 600; }
.step.active .step-marker { background: var(--color-primary, #3b82f6); color: white; }
.step.complete .step-marker { background: var(--color-success, #10b981); color: white; }
.step-line { flex: 1; height: 2px; background: var(--color-border, #e2e8f0); margin: 0 0.5rem; }
.step.complete .step-line { background: var(--color-success, #10b981); }
.step:last-child .step-line { display: none; }
.step-label { margin-top: 0.5rem; font-size: 0.875rem; text-align: center; }`;

export class Stepper extends UIComponent {
  static is = 'ui-stepper';
  @property({ type: Number, reflect: true }) current = 0;
  @property({ type: String, reflect: true }) steps = '';

  protected _render() {
    const stepList = this.steps.split(',').map(s => s.trim());
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="stepper" part="stepper">
        ${stepList.map((step, i) => `
          <div class="step ${i === this.current ? 'active' : ''} ${i < this.current ? 'complete' : ''}" part="step">
            <div class="step-content">
              <div class="step-marker">${i < this.current ? '✓' : i + 1}</div>
              <div class="step-label">${step}</div>
            </div>
            <div class="step-line"></div>
          </div>
        `).join('')}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'current') this.current = parseInt(newValue) || 0;
    else if (name === 'steps') this.steps = newValue || '';
  }
}

customElements.define(Stepper.is, Stepper);
