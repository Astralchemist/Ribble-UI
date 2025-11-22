import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: relative; }
.carousel { position: relative; overflow: hidden; border-radius: var(--radius-md, 0.375rem); }
.carousel-track { display: flex; transition: transform 0.3s ease; }
.carousel-slide { flex: 0 0 100%; }
.carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); padding: 0.5rem; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; cursor: pointer; z-index: 10; }
.carousel-btn.prev { left: 1rem; }
.carousel-btn.next { right: 1rem; }
.carousel-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1rem; }
.dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-border, #e2e8f0); cursor: pointer; }
.dot.active { background: var(--color-primary, #3b82f6); }`;

export class Carousel extends UIComponent {
  static is = 'ui-carousel';
  @property({ type: Number, reflect: true }) current = 0;
  @property({ type: Boolean, reflect: true }) autoplay = false;
  @property({ type: Number, reflect: true }) interval = 3000;
  private timer: number | null = null;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="carousel" part="carousel">
        <div class="carousel-track" style="transform: translateX(-${this.current * 100}%)"><slot></slot></div>
        <button class="carousel-btn prev" part="prev" aria-label="Previous">‹</button>
        <button class="carousel-btn next" part="next" aria-label="Next">›</button>
      </div>
      <div class="carousel-dots" part="dots"></div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'current') this.current = parseInt(newValue) || 0;
    else if (name === 'autoplay') this.autoplay = newValue !== null;
  }
}

customElements.define(Carousel.is, Carousel);
