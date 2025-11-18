import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --table-border: var(--color-border, #e0e0e0);
  --table-header-bg: var(--color-surface-hover, #f9fafb);
  --table-row-hover-bg: var(--color-surface-hover, #f5f5f5);
  --table-text-color: var(--color-text, #1a1a1a);
  --table-text-muted: var(--color-text-muted, #6b7280);
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm, 0.875rem);
}

.table.bordered {
  border: 1px solid var(--table-border);
}

.table.striped tbody tr:nth-child(even) {
  background: var(--color-surface-hover, #fafafa);
}

.table thead {
  background: var(--table-header-bg);
}

.table th {
  padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
  text-align: left;
  font-weight: var(--font-weight-semibold, 600);
  color: var(--table-text-color);
  border-bottom: 2px solid var(--table-border);
}

.table td {
  padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
  color: var(--table-text-color);
  border-bottom: 1px solid var(--table-border);
}

.table tbody tr {
  transition: background 0.2s;
}

.table.hoverable tbody tr:hover {
  background: var(--table-row-hover-bg);
}

.table.compact th,
.table.compact td {
  padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
}

.table th.sortable {
  cursor: pointer;
  user-select: none;
}

.table th.sortable:hover {
  background: var(--table-row-hover-bg);
}

.sort-icon {
  display: inline-block;
  margin-left: var(--spacing-1, 0.25rem);
  width: 0.75rem;
  height: 0.75rem;
  opacity: 0.5;
}

.table-empty {
  text-align: center;
  padding: var(--spacing-8, 2rem);
  color: var(--table-text-muted);
}
`;

export class Table extends UIComponent {
  static is = 'ui-table';

  @property({ type: Array })
  columns: { key: string; label: string; sortable?: boolean }[] = [];

  @property({ type: Array })
  data: Record<string, any>[] = [];

  @property({ type: Boolean, reflect: true })
  bordered = false;

  @property({ type: Boolean, reflect: true })
  striped = false;

  @property({ type: Boolean, reflect: true })
  hoverable = true;

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: String, reflect: true })
  sortBy = '';

  @property({ type: String, reflect: true })
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    super({
      shadow: { mode: 'open' }
    });
  }

  protected _render() {
    const sortedData = this._getSortedData();

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="table-wrapper" part="wrapper">
        <table class="table ${this.bordered ? 'bordered' : ''} ${this.striped ? 'striped' : ''} ${this.hoverable ? 'hoverable' : ''} ${this.compact ? 'compact' : ''}" part="table">
          <thead part="thead">
            <tr>
              ${this.columns.map(col => `
                <th
                  class="${col.sortable ? 'sortable' : ''}"
                  data-key="${col.key}"
                  part="th"
                >
                  ${col.label}
                  ${col.sortable ? `
                    <svg class="sort-icon" viewBox="0 0 16 16" fill="currentColor">
                      ${this.sortBy === col.key ? (
                        this.sortOrder === 'asc'
                          ? '<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>'
                          : '<path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>'
                      ) : '<path d="M3.5 12.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>'}
                    </svg>
                  ` : ''}
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody part="tbody">
            ${sortedData.length === 0 ? `
              <tr>
                <td colspan="${this.columns.length}" class="table-empty" part="empty">
                  No data available
                </td>
              </tr>
            ` : sortedData.map(row => `
              <tr part="tr">
                ${this.columns.map(col => `
                  <td part="td">${row[col.key] ?? ''}</td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    this._attachEvents();
  }

  protected _getSortedData(): Record<string, any>[] {
    if (!this.sortBy) return this.data;

    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortBy];
      const bVal = b[this.sortBy];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  protected _attachEvents() {
    const sortableHeaders = this._shadow.querySelectorAll('th.sortable');
    sortableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const key = (header as HTMLElement).dataset.key || '';

        if (this.sortBy === key) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortBy = key;
          this.sortOrder = 'asc';
        }

        this._render();
        this.emit('sort', { sortBy: this.sortBy, sortOrder: this.sortOrder });
      });
    });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'bordered':
        this.bordered = newValue !== null;
        break;
      case 'striped':
        this.striped = newValue !== null;
        break;
      case 'hoverable':
        this.hoverable = newValue !== null;
        break;
      case 'compact':
        this.compact = newValue !== null;
        break;
      case 'sort-by':
        this.sortBy = newValue || '';
        break;
      case 'sort-order':
        this.sortOrder = (newValue as any) || 'asc';
        break;
    }
  }
}

customElements.define(Table.is, Table);
