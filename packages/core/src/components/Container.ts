import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --container-max-width: 1200px;
  --container-padding: var(--spacing-4, 1rem);
  --grid-gap: var(--spacing-4, 1rem);
}

.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.container.fluid {
  max-width: none;
}

.container.grid {
  display: grid;
  gap: var(--grid-gap);
}

.container.grid.cols-1 { grid-template-columns: repeat(1, 1fr); }
.container.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.container.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.container.grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.container.grid.cols-5 { grid-template-columns: repeat(5, 1fr); }
.container.grid.cols-6 { grid-template-columns: repeat(6, 1fr); }
.container.grid.cols-12 { grid-template-columns: repeat(12, 1fr); }

.container.flex {
  display: flex;
  gap: var(--grid-gap);
}

.container.flex.row { flex-direction: row; }
.container.flex.column { flex-direction: column; }
.container.flex.wrap { flex-wrap: wrap; }

.container.flex.justify-start { justify-content: flex-start; }
.container.flex.justify-center { justify-content: center; }
.container.flex.justify-end { justify-content: flex-end; }
.container.flex.justify-between { justify-content: space-between; }
.container.flex.justify-around { justify-content: space-around; }

.container.flex.align-start { align-items: flex-start; }
.container.flex.align-center { align-items: center; }
.container.flex.align-end { align-items: flex-end; }
.container.flex.align-stretch { align-items: stretch; }

@media (max-width: 768px) {
  .container.grid {
    grid-template-columns: 1fr !important;
  }
}
`;

export class Container extends UIComponent {
  static is = 'ui-container';

  @property({ type: Boolean, reflect: true })
  fluid = false;

  @property({ type: Boolean, reflect: true })
  grid = false;

  @property({ type: Boolean, reflect: true })
  flex = false;

  @property({ type: Number, reflect: true })
  cols = 1;

  @property({ type: String, reflect: true })
  direction: 'row' | 'column' = 'row';

  @property({ type: Boolean, reflect: true })
  wrap = false;

  @property({ type: String, reflect: true })
  justify: 'start' | 'center' | 'end' | 'between' | 'around' = 'start';

  @property({ type: String, reflect: true })
  align: 'start' | 'center' | 'end' | 'stretch' = 'start';

  constructor() {
    super({
      shadow: { mode: 'open' }
    });
  }

  protected _render() {
    const classes = ['container'];

    if (this.fluid) classes.push('fluid');
    if (this.grid) {
      classes.push('grid', `cols-${this.cols}`);
    }
    if (this.flex) {
      classes.push('flex', this.direction);
      if (this.wrap) classes.push('wrap');
      classes.push(`justify-${this.justify}`, `align-${this.align}`);
    }

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="${classes.join(' ')}" part="container">
        <slot></slot>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'fluid':
        this.fluid = newValue !== null;
        break;
      case 'grid':
        this.grid = newValue !== null;
        break;
      case 'flex':
        this.flex = newValue !== null;
        break;
      case 'cols':
        this.cols = parseInt(newValue) || 1;
        break;
      case 'direction':
        this.direction = newValue === 'column' ? 'column' : 'row';
        break;
      case 'wrap':
        this.wrap = newValue !== null;
        break;
      case 'justify':
        this.justify = newValue || 'start';
        break;
      case 'align':
        this.align = newValue || 'start';
        break;
    }
  }
}

customElements.define(Container.is, Container);
