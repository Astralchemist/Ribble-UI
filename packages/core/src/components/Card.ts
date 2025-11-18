import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --card-bg: var(--color-surface, #ffffff);
  --card-border: var(--color-border, #e0e0e0);
  --card-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));
  --card-radius: var(--radius-lg, 0.5rem);
  --card-padding: var(--spacing-4, 1rem);
  --card-header-bg: var(--color-surface-hover, #f9fafb);
  --card-text-color: var(--color-text, #1a1a1a);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card.hoverable:hover {
  box-shadow: var(--shadow-lg, 0 10px 15px rgba(0,0,0,0.15));
  transform: translateY(-2px);
}

.card.clickable {
  cursor: pointer;
}

.card-header {
  padding: var(--card-padding);
  background: var(--card-header-bg);
  border-bottom: 1px solid var(--card-border);
}

.card-title {
  margin: 0;
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--card-text-color);
}

.card-subtitle {
  margin: var(--spacing-1, 0.25rem) 0 0;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-text-muted, #6b7280);
}

.card-body {
  padding: var(--card-padding);
  color: var(--card-text-color);
}

.card-footer {
  padding: var(--card-padding);
  background: var(--card-header-bg);
  border-top: 1px solid var(--card-border);
}

.card.no-padding .card-body {
  padding: 0;
}
`;

export class Card extends UIComponent {
  static is = 'ui-card';

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  subtitle = '';

  @property({ type: Boolean, reflect: true })
  hoverable = false;

  @property({ type: Boolean, reflect: true })
  clickable = false;

  @property({ type: Boolean, reflect: true })
  noPadding = false;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'article' }
    });
  }

  protected _render() {
    const hasHeader = this.title || this.subtitle;
    const hasFooterSlot = this.querySelector('[slot="footer"]');

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="card ${this.hoverable ? 'hoverable' : ''} ${this.clickable ? 'clickable' : ''} ${this.noPadding ? 'no-padding' : ''}"
        part="card"
      >
        ${hasHeader ? `
          <div class="card-header" part="header">
            ${this.title ? `
              <h3 class="card-title" part="title">${this.title}</h3>
            ` : ''}
            ${this.subtitle ? `
              <p class="card-subtitle" part="subtitle">${this.subtitle}</p>
            ` : ''}
          </div>
        ` : ''}

        <div class="card-body" part="body">
          <slot></slot>
        </div>

        ${hasFooterSlot ? `
          <div class="card-footer" part="footer">
            <slot name="footer"></slot>
          </div>
        ` : ''}
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    if (this.clickable) {
      const card = this._shadow.querySelector('.card');
      card?.addEventListener('click', () => {
        this.emit('click', {});
      });
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'title':
        this.title = newValue || '';
        break;
      case 'subtitle':
        this.subtitle = newValue || '';
        break;
      case 'hoverable':
        this.hoverable = newValue !== null;
        break;
      case 'clickable':
        this.clickable = newValue !== null;
        break;
      case 'no-padding':
        this.noPadding = newValue !== null;
        break;
    }
  }
}

customElements.define(Card.is, Card);
