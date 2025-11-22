import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.skeleton { background: linear-gradient(90deg, var(--color-border, #e2e8f0) 25%, var(--color-bg-secondary, #f1f5f9) 50%, var(--color-border, #e2e8f0) 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: var(--radius-sm, 0.25rem); }
@keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.skeleton.circle { border-radius: 50%; }
.skeleton.text { height: 1rem; }`;

export class Skeleton extends UIComponent {
  static is = 'ui-skeleton';
  @property({ type: String, reflect: true }) variant: 'text' | 'circle' | 'rect' = 'rect';
  @property({ type: String, reflect: true }) width = '100%';
  @property({ type: String, reflect: true }) height = '4rem';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="skeleton ${this.variant}" part="skeleton" style="width: ${this.width}; height: ${this.height};" aria-busy="true" aria-live="polite"></div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'variant') this.variant = (newValue as any) || 'rect';
    else if (name === 'width') this.width = newValue || '100%';
    else if (name === 'height') this.height = newValue || '4rem';
  }
}

customElements.define(Skeleton.is, Skeleton);
