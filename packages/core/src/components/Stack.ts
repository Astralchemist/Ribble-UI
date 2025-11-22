import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.stack-container {
  display: flex;
  width: 100%;
}

.stack-container.vertical {
  flex-direction: column;
}

.stack-container.horizontal {
  flex-direction: row;
}

.stack-container > ::slotted(*) {
  margin: 0;
}

.stack-container.vertical > ::slotted(*:not(:last-child)) {
  margin-bottom: var(--stack-spacing, 1rem);
}

.stack-container.horizontal > ::slotted(*:not(:last-child)) {
  margin-right: var(--stack-spacing, 1rem);
}

.stack-container.align-start {
  align-items: flex-start;
}

.stack-container.align-end {
  align-items: flex-end;
}

.stack-container.align-center {
  align-items: center;
}

.stack-container.align-stretch {
  align-items: stretch;
}

.stack-container.justify-start {
  justify-content: flex-start;
}

.stack-container.justify-end {
  justify-content: flex-end;
}

.stack-container.justify-center {
  justify-content: center;
}

.stack-container.justify-between {
  justify-content: space-between;
}

.stack-container.wrap {
  flex-wrap: wrap;
}

.divider {
  width: 100%;
  height: 1px;
  background: var(--color-border, #e2e8f0);
  margin: var(--stack-spacing, 1rem) 0;
}

.divider.horizontal-divider {
  width: 1px;
  height: auto;
  margin: 0 var(--stack-spacing, 1rem);
  align-self: stretch;
}
`;

export class Stack extends UIComponent {
  static is = 'ui-stack';

  @property({ type: String, reflect: true })
  direction: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: String, reflect: true })
  spacing = '1rem';

  @property({ type: String, reflect: true })
  align: 'start' | 'end' | 'center' | 'stretch' = 'stretch';

  @property({ type: String, reflect: true })
  justify: 'start' | 'end' | 'center' | 'between' = 'start';

  @property({ type: Boolean, reflect: true })
  wrap = false;

  @property({ type: Boolean, reflect: true })
  dividers = false;

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  protected _render() {
    const classes = [
      'stack-container',
      this.direction,
      `align-${this.align}`,
      `justify-${this.justify}`,
      this.wrap ? 'wrap' : ''
    ].filter(Boolean).join(' ');

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="${classes}"
        part="stack"
        style="--stack-spacing: ${this.spacing};"
      >
        <slot></slot>
      </div>
    `;

    if (this.dividers) {
      this._addDividers();
    }
  }

  private _addDividers() {
    const slot = this._shadow.querySelector('slot') as HTMLSlotElement;
    if (!slot) return;

    const elements = slot.assignedElements();
    const container = this._shadow.querySelector('.stack-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    elements.forEach((element, index) => {
      container.appendChild(element);

      if (index < elements.length - 1) {
        const divider = document.createElement('div');
        divider.className = this.direction === 'horizontal' ? 'divider horizontal-divider' : 'divider';
        divider.setAttribute('part', 'divider');
        divider.setAttribute('aria-hidden', 'true');
        container.appendChild(divider);
      }
    });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'direction':
        this.direction = (newValue as any) || 'vertical';
        break;
      case 'spacing':
        this.spacing = newValue || '1rem';
        break;
      case 'align':
        this.align = (newValue as any) || 'stretch';
        break;
      case 'justify':
        this.justify = (newValue as any) || 'start';
        break;
      case 'wrap':
        this.wrap = newValue !== null;
        break;
      case 'dividers':
        this.dividers = newValue !== null;
        break;
    }
  }
}

customElements.define(Stack.is, Stack);
