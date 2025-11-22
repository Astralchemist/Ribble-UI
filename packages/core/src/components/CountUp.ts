import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-block; }
.countup { font-size: 2rem; font-weight: 700; color: var(--color-text, #1e293b); }`;

export class CountUp extends UIComponent {
  static is = 'ui-countup';
  @property({ type: Number, reflect: true }) start = 0;
  @property({ type: Number, reflect: true }) end = 100;
  @property({ type: Number, reflect: true }) duration = 2000;
  @property({ type: String, reflect: true }) suffix = '';
  @property({ type: String, reflect: true }) prefix = '';

  connectedCallback() {
    super.connectedCallback();
    this._animate();
  }

  private _animate() {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const current = Math.floor(this.start + (this.end - this.start) * progress);
      const display = this._shadow.querySelector('.countup');
      if (display) display.textContent = `${this.prefix}${current}${this.suffix}`;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style><div class="countup" part="countup">${this.prefix}${this.start}${this.suffix}</div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'start') this.start = parseInt(newValue) || 0;
    else if (name === 'end') this.end = parseInt(newValue) || 100;
    else if (name === 'duration') this.duration = parseInt(newValue) || 2000;
  }
}

customElements.define(CountUp.is, CountUp);
