import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.infinite-scroll { min-height: 100px; }
.loader { display: flex; justify-content: center; padding: 2rem; }`;

export class InfiniteScroll extends UIComponent {
  static is = 'ui-infinite-scroll';
  @property({ type: String, reflect: true }) threshold = '0.5';
  @property({ type: Boolean, reflect: true }) loading = false;
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
        if (entry.isIntersecting && !this.loading) {
          this.emit('loadmore');
        }
      });
    }, { threshold: parseFloat(this.threshold) });

    this.observer.observe(this);
  }

  protected _render() {
    const loader = this.loading ? '<div class="loader" part="loader">Loading...</div>' : '';
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="infinite-scroll" part="scroll">
        <slot></slot>
        ${loader}
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'threshold') this.threshold = newValue || '0.5';
    else if (name === 'loading') this.loading = newValue !== null;
  }
}

customElements.define(InfiniteScroll.is, InfiniteScroll);
