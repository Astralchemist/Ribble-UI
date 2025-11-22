import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(var(--gallery-min-width, 200px), 1fr)); gap: var(--gallery-gap, 1rem); }
.gallery-item { position: relative; overflow: hidden; border-radius: var(--radius-md, 0.375rem); aspect-ratio: var(--gallery-aspect, 1); cursor: pointer; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.gallery-item:hover img { transform: scale(1.05); }`;

export class Gallery extends UIComponent {
  static is = 'ui-gallery';
  @property({ type: String, reflect: true }) minWidth = '200px';
  @property({ type: String, reflect: true }) gap = '1rem';
  @property({ type: String, reflect: true }) aspectRatio = '1';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="gallery" part="gallery" style="--gallery-min-width: ${this.minWidth}; --gallery-gap: ${this.gap}; --gallery-aspect: ${this.aspectRatio};">
        <slot></slot>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'minWidth') this.minWidth = newValue || '200px';
    else if (name === 'gap') this.gap = newValue || '1rem';
    else if (name === 'aspectRatio') this.aspectRatio = newValue || '1';
  }
}

customElements.define(Gallery.is, Gallery);
