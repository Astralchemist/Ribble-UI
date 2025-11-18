import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --accordion-border: var(--color-border, #e0e0e0);
  --accordion-bg: var(--color-surface, #ffffff);
  --accordion-hover-bg: var(--color-surface-hover, #f9fafb);
  --accordion-text-color: var(--color-text, #1a1a1a);
}

.accordion {
  border: 1px solid var(--accordion-border);
  border-radius: var(--radius-md, 0.375rem);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid var(--accordion-border);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: var(--spacing-4, 1rem);
  background: var(--accordion-bg);
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-base, 1rem);
  font-weight: var(--font-weight-medium, 500);
  color: var(--accordion-text-color);
  transition: background 0.2s;
}

.accordion-header:hover {
  background: var(--accordion-hover-bg);
}

.accordion-header:focus {
  outline: 2px solid var(--color-primary, #007bff);
  outline-offset: -2px;
}

.accordion-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: var(--spacing-2, 0.5rem);
}

.accordion-header.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.active {
  max-height: 1000px;
}

.accordion-body {
  padding: var(--spacing-4, 1rem);
  color: var(--color-text-muted, #6b7280);
}
`;

export class Accordion extends UIComponent {
  static is = 'ui-accordion';

  @property({ type: Array })
  items: { title: string; content: string }[] = [];

  @property({ type: Boolean, reflect: true })
  multiple = false;

  private _activeIndices: Set<number> = new Set();

  constructor() {
    super({
      shadow: { mode: 'open' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="accordion" part="accordion">
        ${this.items.map((item, index) => {
          const isActive = this._activeIndices.has(index);
          return `
            <div class="accordion-item" part="item">
              <button
                class="accordion-header ${isActive ? 'active' : ''}"
                aria-expanded="${isActive}"
                aria-controls="content-${index}"
                data-index="${index}"
                part="header"
              >
                <span>${item.title}</span>
                <svg class="accordion-icon" viewBox="0 0 16 16" fill="currentColor" part="icon">
                  <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              <div
                class="accordion-content ${isActive ? 'active' : ''}"
                id="content-${index}"
                role="region"
                aria-labelledby="header-${index}"
                part="content"
              >
                <div class="accordion-body" part="body">
                  ${item.content || `<slot name="item-${index}"></slot>`}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const headers = this._shadow.querySelectorAll('.accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');

        if (this.multiple) {
          if (this._activeIndices.has(index)) {
            this._activeIndices.delete(index);
          } else {
            this._activeIndices.add(index);
          }
        } else {
          if (this._activeIndices.has(index)) {
            this._activeIndices.clear();
          } else {
            this._activeIndices.clear();
            this._activeIndices.add(index);
          }
        }

        this._render();
        this.emit('change', { activeIndices: Array.from(this._activeIndices) });
      });
    });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'multiple') {
      this.multiple = newValue !== null;
    }
  }
}

customElements.define(Accordion.is, Accordion);
