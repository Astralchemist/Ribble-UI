import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.lazy { min-height: var(--lazy-height, 200px); }`;

export class LazyLoad extends UIComponent {
  static is = 'ui-lazy-load';
  @property({ type: String, reflect: true }) threshold = '0.1';
  private observer: IntersectionObserver | null = null;
  private loaded = false;

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
        if (entry.isIntersecting && !this.loaded) {
          this.loaded = true;
          this.emit('load');
          this._render();
        }
      });
    }, { threshold: parseFloat(this.threshold) });

    this.observer.observe(this);
  }

  protected _render() {
    const content = this.loaded ? '<slot></slot>' : '<slot name="placeholder"></slot>';
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="lazy" part="lazy">${content}</div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'threshold') this.threshold = newValue || '0.1';
  }
}

customElements.define(LazyLoad.is, LazyLoad);
