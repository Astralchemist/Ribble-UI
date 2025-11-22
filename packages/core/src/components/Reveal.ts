import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.reveal { opacity: 0; transform: translateY(2rem); transition: all 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }`;

export class Reveal extends UIComponent {
  static is = 'ui-reveal';
  @property({ type: String, reflect: true }) threshold = '0.1';
  private observer: IntersectionObserver | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._setupObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.observer) this.observer.disconnect();
  }

  private _setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = this._shadow.querySelector('.reveal');
        if (entry.isIntersecting) el?.classList.add('visible');
      });
    }, { threshold: parseFloat(this.threshold) });

    this.observer.observe(this);
  }

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="reveal" part="reveal"><slot></slot></div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'threshold') this.threshold = newValue || '0.1';
  }
}

customElements.define(Reveal.is, Reveal);
