import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --breadcrumb-text-color: var(--color-text-muted, #6b7280);
  --breadcrumb-link-color: var(--color-primary, #007bff);
  --breadcrumb-separator-color: var(--color-text-muted, #6b7280);
}

.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-2, 0.5rem);
  font-size: var(--font-size-sm, 0.875rem);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2, 0.5rem);
}

.breadcrumb-link {
  color: var(--breadcrumb-link-color);
  text-decoration: none;
  transition: opacity 0.2s;
}

.breadcrumb-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.breadcrumb-text {
  color: var(--breadcrumb-text-color);
}

.breadcrumb-separator {
  color: var(--breadcrumb-separator-color);
  user-select: none;
}
`;

export class Breadcrumbs extends UIComponent {
  static is = 'ui-breadcrumbs';

  @property({ type: Array })
  items: { label: string; href?: string }[] = [];

  @property({ type: String, reflect: true })
  separator = '/';

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'navigation', 'aria-label': 'Breadcrumb' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <nav class="breadcrumbs" part="breadcrumbs">
        ${this.items.map((item, index) => {
          const isLast = index === this.items.length - 1;
          return `
            <div class="breadcrumb-item" part="item">
              ${item.href && !isLast ? `
                <a href="${item.href}" class="breadcrumb-link" part="link">
                  ${item.label}
                </a>
              ` : `
                <span class="breadcrumb-text" part="text" ${isLast ? 'aria-current="page"' : ''}>
                  ${item.label}
                </span>
              `}
              ${!isLast ? `
                <span class="breadcrumb-separator" aria-hidden="true" part="separator">
                  ${this.separator}
                </span>
              ` : ''}
            </div>
          `;
        }).join('')}
      </nav>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const links = this._shadow.querySelectorAll('.breadcrumb-link');
    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.emit('navigate', { item: this.items[index], index });
      });
    });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'separator') {
      this.separator = newValue || '/';
    }
  }
}

customElements.define(Breadcrumbs.is, Breadcrumbs);
