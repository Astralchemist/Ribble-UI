import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --pagination-bg: var(--color-surface, #ffffff);
  --pagination-border: var(--color-border, #d1d5db);
  --pagination-active-bg: var(--color-primary, #007bff);
  --pagination-active-color: var(--color-on-primary, #fff);
  --pagination-hover-bg: var(--color-surface-hover, #f5f5f5);
  --pagination-text-color: var(--color-text, #1a1a1a);
}

.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-1, 0.25rem);
  justify-content: center;
  flex-wrap: wrap;
}

.page-button {
  min-width: 2.5rem;
  height: 2.5rem;
  padding: var(--spacing-2, 0.5rem);
  background: var(--pagination-bg);
  border: 1px solid var(--pagination-border);
  border-radius: var(--radius-md, 0.375rem);
  color: var(--pagination-text-color);
  cursor: pointer;
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: var(--font-weight-medium, 500);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.page-button:hover:not(:disabled):not(.active) {
  background: var(--pagination-hover-bg);
}

.page-button.active {
  background: var(--pagination-active-bg);
  border-color: var(--pagination-active-bg);
  color: var(--pagination-active-color);
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-button:focus {
  outline: 2px solid var(--pagination-active-bg);
  outline-offset: 2px;
}

.pagination-info {
  padding: 0 var(--spacing-2, 0.5rem);
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-text-muted, #6b7280);
}
`;

export class Pagination extends UIComponent {
  static is = 'ui-pagination';

  @property({ type: Number, reflect: true })
  currentPage = 1;

  @property({ type: Number, reflect: true })
  totalPages = 1;

  @property({ type: Boolean, reflect: true })
  showInfo = false;

  @property({ type: Number, reflect: true })
  siblingCount = 1;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'navigation', 'aria-label': 'Pagination' }
    });
  }

  protected _render() {
    const pages = this._getPageNumbers();

    this._shadow.innerHTML = `
      <style>${style}</style>
      <nav class="pagination" part="pagination">
        <button
          class="page-button"
          ${this.currentPage === 1 ? 'disabled' : ''}
          data-action="prev"
          aria-label="Previous page"
          part="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>

        ${pages.map(page => {
          if (page === '...') {
            return `<span class="pagination-info">...</span>`;
          }
          return `
            <button
              class="page-button ${page === this.currentPage ? 'active' : ''}"
              data-page="${page}"
              aria-label="Page ${page}"
              aria-current="${page === this.currentPage ? 'page' : 'false'}"
              part="button"
            >
              ${page}
            </button>
          `;
        }).join('')}

        <button
          class="page-button"
          ${this.currentPage === this.totalPages ? 'disabled' : ''}
          data-action="next"
          aria-label="Next page"
          part="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        ${this.showInfo ? `
          <span class="pagination-info" part="info">
            Page ${this.currentPage} of ${this.totalPages}
          </span>
        ` : ''}
      </nav>
    `;

    this._attachEvents();
  }

  protected _getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalNumbers = this.siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (this.totalPages <= totalBlocks) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * this.siblingCount;
      pages.push(...Array.from({ length: leftItemCount }, (_, i) => i + 1));
      pages.push('...');
      pages.push(this.totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      pages.push(1);
      pages.push('...');
      const rightItemCount = 3 + 2 * this.siblingCount;
      pages.push(...Array.from({ length: rightItemCount }, (_, i) => this.totalPages - rightItemCount + i + 1));
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(this.totalPages);
    }

    return pages;
  }

  protected _attachEvents() {
    const buttons = this._shadow.querySelectorAll('.page-button[data-page], .page-button[data-action]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = (btn as HTMLElement).dataset.action;
        const page = (btn as HTMLElement).dataset.page;

        if (action === 'prev' && this.currentPage > 1) {
          this.currentPage--;
        } else if (action === 'next' && this.currentPage < this.totalPages) {
          this.currentPage++;
        } else if (page) {
          this.currentPage = parseInt(page);
        }

        this._render();
        this.emit('change', { page: this.currentPage });
      });
    });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'current-page':
        this.currentPage = parseInt(newValue) || 1;
        break;
      case 'total-pages':
        this.totalPages = parseInt(newValue) || 1;
        break;
      case 'show-info':
        this.showInfo = newValue !== null;
        break;
      case 'sibling-count':
        this.siblingCount = parseInt(newValue) || 1;
        break;
    }
  }
}

customElements.define(Pagination.is, Pagination);
