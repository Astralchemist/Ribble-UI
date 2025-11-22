import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: flex;
}

.flex-container {
  display: flex;
  width: 100%;
  height: 100%;
  gap: var(--flex-gap, 0);
}

.flex-container.row {
  flex-direction: row;
}

.flex-container.column {
  flex-direction: column;
}

.flex-container.row-reverse {
  flex-direction: row-reverse;
}

.flex-container.column-reverse {
  flex-direction: column-reverse;
}

.flex-container.wrap {
  flex-wrap: wrap;
}

.flex-container.nowrap {
  flex-wrap: nowrap;
}

.flex-container.wrap-reverse {
  flex-wrap: wrap-reverse;
}

/* Justify Content */
.flex-container.justify-start {
  justify-content: flex-start;
}

.flex-container.justify-end {
  justify-content: flex-end;
}

.flex-container.justify-center {
  justify-content: center;
}

.flex-container.justify-between {
  justify-content: space-between;
}

.flex-container.justify-around {
  justify-content: space-around;
}

.flex-container.justify-evenly {
  justify-content: space-evenly;
}

/* Align Items */
.flex-container.align-start {
  align-items: flex-start;
}

.flex-container.align-end {
  align-items: flex-end;
}

.flex-container.align-center {
  align-items: center;
}

.flex-container.align-baseline {
  align-items: baseline;
}

.flex-container.align-stretch {
  align-items: stretch;
}

/* Align Content */
.flex-container.content-start {
  align-content: flex-start;
}

.flex-container.content-end {
  align-content: flex-end;
}

.flex-container.content-center {
  align-content: center;
}

.flex-container.content-between {
  align-content: space-between;
}

.flex-container.content-around {
  align-content: space-around;
}

.flex-container.content-stretch {
  align-content: stretch;
}
`;

export class Flex extends UIComponent {
  static is = 'ui-flex';

  @property({ type: String, reflect: true })
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'row';

  @property({ type: String, reflect: true })
  wrap: 'wrap' | 'nowrap' | 'wrap-reverse' = 'nowrap';

  @property({ type: String, reflect: true })
  justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' = 'start';

  @property({ type: String, reflect: true })
  align: 'start' | 'end' | 'center' | 'baseline' | 'stretch' = 'stretch';

  @property({ type: String, reflect: true })
  alignContent: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch' = 'stretch';

  @property({ type: String, reflect: true })
  gap = '0';

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  protected _render() {
    const classes = [
      'flex-container',
      this.direction,
      this.wrap,
      `justify-${this.justify}`,
      `align-${this.align}`,
      `content-${this.alignContent}`
    ].join(' ');

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="${classes}"
        part="flex"
        style="--flex-gap: ${this.gap};"
      >
        <slot></slot>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'direction':
        this.direction = (newValue as any) || 'row';
        break;
      case 'wrap':
        this.wrap = (newValue as any) || 'nowrap';
        break;
      case 'justify':
        this.justify = (newValue as any) || 'start';
        break;
      case 'align':
        this.align = (newValue as any) || 'stretch';
        break;
      case 'alignContent':
        this.alignContent = (newValue as any) || 'stretch';
        break;
      case 'gap':
        this.gap = newValue || '0';
        break;
    }
  }
}

customElements.define(Flex.is, Flex);
