import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: none; }
:host([open]) { display: block; position: fixed; inset: 0; z-index: 100; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); }
.palette { position: fixed; top: 20%; left: 50%; transform: translateX(-50%); width: 90%; max-width: 40rem; background: var(--color-surface, #fff); border-radius: var(--radius-md, 0.375rem); box-shadow: 0 20px 50px rgba(0,0,0,0.3); overflow: hidden; }
.palette-search { width: 100%; padding: 1rem 1.5rem; border: none; border-bottom: 1px solid var(--color-border, #e2e8f0); font-size: 1rem; }
.palette-results { max-height: 20rem; overflow-y: auto; padding: 0.5rem; }
.palette-item { padding: 0.75rem 1rem; border-radius: var(--radius-sm, 0.25rem); cursor: pointer; }
.palette-item:hover { background: var(--color-bg-secondary, #f8fafc); }`;

export class CommandPalette extends UIComponent {
  static is = 'ui-command-palette';
  @property({ type: Boolean, reflect: true }) open = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="overlay" part="overlay"></div>
      <div class="palette" part="palette" role="dialog">
        <input type="text" class="palette-search" part="search" placeholder="Type a command..." />
        <div class="palette-results" part="results"><slot></slot></div>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'open') this.open = newValue !== null;
  }
}

customElements.define(CommandPalette.is, CommandPalette);
