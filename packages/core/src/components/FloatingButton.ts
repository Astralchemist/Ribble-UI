import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: fixed; z-index: 40; }
:host([position="bottom-right"]) { bottom: 2rem; right: 2rem; }
:host([position="bottom-left"]) { bottom: 2rem; left: 2rem; }
:host([position="top-right"]) { top: 2rem; right: 2rem; }
:host([position="top-left"]) { top: 2rem; left: 2rem; }
.fab { width: 3.5rem; height: 3.5rem; border-radius: 50%; background: var(--color-primary, #3b82f6); color: white; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
.fab:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
.fab:active { transform: scale(0.95); }`;

export class FloatingButton extends UIComponent {
  static is = 'ui-floating-button';
  @property({ type: String, reflect: true }) position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  @property({ type: String, reflect: true }) icon = '+';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <button class="fab" part="fab" aria-label="Floating action button">
        <slot>${this.icon}</slot>
      </button>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'position') this.position = (newValue as any) || 'bottom-right';
    else if (name === 'icon') this.icon = newValue || '+';
  }
}

customElements.define(FloatingButton.is, FloatingButton);
