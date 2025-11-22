import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.transition { transition: all var(--duration, 0.3s) var(--easing, ease); }
.fade-enter { opacity: 0; }
.fade-enter-active { opacity: 1; }
.slide-enter { transform: translateY(-1rem); opacity: 0; }
.slide-enter-active { transform: translateY(0); opacity: 1; }`;

export class Transition extends UIComponent {
  static is = 'ui-transition';
  @property({ type: String, reflect: true }) type: 'fade' | 'slide' | 'scale' = 'fade';
  @property({ type: String, reflect: true }) duration = '0.3s';
  @property({ type: Boolean, reflect: true }) show = true;

  protected _render() {
    const activeClass = this.show ? this.type + '-enter-active' : '';
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="transition ${this.type}-enter ${activeClass}"
           style="--duration: ${this.duration};" part="transition">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'type') this.type = (newValue as any) || 'fade';
    else if (name === 'duration') this.duration = newValue || '0.3s';
    else if (name === 'show') this.show = newValue !== null;
  }
}

customElements.define(Transition.is, Transition);
