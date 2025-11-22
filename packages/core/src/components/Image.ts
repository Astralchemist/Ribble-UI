import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.image-wrapper { position: relative; overflow: hidden; border-radius: var(--radius-md, 0.375rem); }
img { width: 100%; height: 100%; object-fit: var(--image-fit, cover); transition: all 0.3s; }
img.loading { opacity: 0; }
img.loaded { opacity: 1; }
.skeleton { width: 100%; height: 100%; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
@keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`;

export class Image extends UIComponent {
  static is = 'ui-image';
  @property({ type: String, reflect: true }) src = '';
  @property({ type: String, reflect: true }) alt = '';
  @property({ type: String, reflect: true }) fit: 'cover' | 'contain' | 'fill' = 'cover';
  @property({ type: Boolean, reflect: true }) lazy = true;
  private loaded = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="image-wrapper" part="wrapper" style="--image-fit: ${this.fit};">
        ${!this.loaded ? '<div class="skeleton"></div>' : ''}
        <img src="${this.src}" alt="${this.alt}" class="${this.loaded ? 'loaded' : 'loading'}" loading="${this.lazy ? 'lazy' : 'eager'}" part="img" />
      </div>`;
    
    const img = this._shadow.querySelector('img');
    if (img) img.addEventListener('load', () => { this.loaded = true; this._render(); });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'src') this.src = newValue || '';
    else if (name === 'alt') this.alt = newValue || '';
    else if (name === 'fit') this.fit = (newValue as any) || 'cover';
    else if (name === 'lazy') this.lazy = newValue !== null;
  }
}

customElements.define(Image.is, Image);
