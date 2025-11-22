import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.grid-container {
  display: grid;
  width: 100%;
  gap: var(--grid-gap, 1rem);
}

.grid-container.auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-width, 250px), 1fr));
}

.grid-container.auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-min-width, 250px), 1fr));
}

:host([cols="1"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(1, 1fr);
}

:host([cols="2"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(2, 1fr);
}

:host([cols="3"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(3, 1fr);
}

:host([cols="4"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(4, 1fr);
}

:host([cols="5"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(5, 1fr);
}

:host([cols="6"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(6, 1fr);
}

:host([cols="12"]) .grid-container:not(.auto-fit):not(.auto-fill) {
  grid-template-columns: repeat(12, 1fr);
}

@media (max-width: 768px) {
  :host([responsive]) .grid-container:not(.auto-fit):not(.auto-fill) {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  :host([responsive][cols="4"]) .grid-container:not(.auto-fit):not(.auto-fill),
  :host([responsive][cols="5"]) .grid-container:not(.auto-fit):not(.auto-fill),
  :host([responsive][cols="6"]) .grid-container:not(.auto-fit):not(.auto-fill) {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

export class Grid extends UIComponent {
  static is = 'ui-grid';

  @property({ type: Number, reflect: true })
  cols = 3;

  @property({ type: String, reflect: true })
  gap = '1rem';

  @property({ type: String, reflect: true })
  mode: 'fixed' | 'auto-fit' | 'auto-fill' = 'fixed';

  @property({ type: String, reflect: true })
  minWidth = '250px';

  @property({ type: Boolean, reflect: true })
  responsive = true;

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="grid-container ${this.mode === 'auto-fit' ? 'auto-fit' : this.mode === 'auto-fill' ? 'auto-fill' : ''}"
        part="grid"
        style="--grid-gap: ${this.gap}; --grid-min-width: ${this.minWidth};"
      >
        <slot></slot>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'cols':
        this.cols = parseInt(newValue) || 3;
        break;
      case 'gap':
        this.gap = newValue || '1rem';
        break;
      case 'mode':
        this.mode = (newValue as any) || 'fixed';
        break;
      case 'minWidth':
        this.minWidth = newValue || '250px';
        break;
      case 'responsive':
        this.responsive = newValue !== null;
        break;
    }
  }
}

customElements.define(Grid.is, Grid);
