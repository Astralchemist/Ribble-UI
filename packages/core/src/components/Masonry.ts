import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.masonry-container {
  display: grid;
  grid-template-columns: repeat(var(--masonry-columns, 3), 1fr);
  grid-auto-rows: var(--masonry-row-height, 10px);
  gap: var(--masonry-gap, 1rem);
  width: 100%;
}

.masonry-container.css-columns {
  display: block;
  column-count: var(--masonry-columns, 3);
  column-gap: var(--masonry-gap, 1rem);
}

.masonry-container.css-columns > ::slotted(*) {
  break-inside: avoid;
  margin-bottom: var(--masonry-gap, 1rem);
  display: inline-block;
  width: 100%;
}

@media (max-width: 1024px) {
  .masonry-container {
    grid-template-columns: repeat(var(--masonry-columns-tablet, 2), 1fr);
  }

  .masonry-container.css-columns {
    column-count: var(--masonry-columns-tablet, 2);
  }
}

@media (max-width: 768px) {
  .masonry-container {
    grid-template-columns: repeat(var(--masonry-columns-mobile, 1), 1fr);
  }

  .masonry-container.css-columns {
    column-count: var(--masonry-columns-mobile, 1);
  }
}
`;

export class Masonry extends UIComponent {
  static is = 'ui-masonry';

  @property({ type: Number, reflect: true })
  columns = 3;

  @property({ type: Number, reflect: true })
  columnsTablet = 2;

  @property({ type: Number, reflect: true })
  columnsMobile = 1;

  @property({ type: String, reflect: true })
  gap = '1rem';

  @property({ type: String, reflect: true })
  mode: 'grid' | 'css-columns' = 'css-columns';

  @property({ type: String, reflect: true })
  rowHeight = '10px';

  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.mode === 'grid') {
      this._setupResizeObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private _setupResizeObserver() {
    const slot = this._shadow.querySelector('slot') as HTMLSlotElement;
    if (!slot) return;

    // Observe size changes of slotted elements
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const height = entry.contentRect.height;
        const rowHeight = parseInt(this.rowHeight);
        const gap = parseInt(this.gap);
        const rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
        element.style.gridRowEnd = `span ${rowSpan}`;
      });
    });

    // Observe all slotted elements
    slot.assignedElements().forEach((el) => {
      if (this.resizeObserver) {
        this.resizeObserver.observe(el);
      }
    });

    // Watch for new elements
    slot.addEventListener('slotchange', () => {
      slot.assignedElements().forEach((el) => {
        if (this.resizeObserver) {
          this.resizeObserver.observe(el);
        }
      });
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="masonry-container ${this.mode === 'css-columns' ? 'css-columns' : ''}"
        part="masonry"
        style="
          --masonry-columns: ${this.columns};
          --masonry-columns-tablet: ${this.columnsTablet};
          --masonry-columns-mobile: ${this.columnsMobile};
          --masonry-gap: ${this.gap};
          --masonry-row-height: ${this.rowHeight};
        "
      >
        <slot></slot>
      </div>
    `;

    if (this.mode === 'grid') {
      this._setupResizeObserver();
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'columns':
        this.columns = parseInt(newValue) || 3;
        break;
      case 'columnsTablet':
        this.columnsTablet = parseInt(newValue) || 2;
        break;
      case 'columnsMobile':
        this.columnsMobile = parseInt(newValue) || 1;
        break;
      case 'gap':
        this.gap = newValue || '1rem';
        break;
      case 'mode':
        this.mode = (newValue as any) || 'css-columns';
        if (this.mode === 'grid') {
          this._setupResizeObserver();
        } else if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }
        break;
      case 'rowHeight':
        this.rowHeight = newValue || '10px';
        break;
    }
  }

  // Public API
  public refresh() {
    this._render();
  }
}

customElements.define(Masonry.is, Masonry);
