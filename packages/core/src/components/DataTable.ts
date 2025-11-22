import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host { display: block; width: 100%; }
.table-container { width: 100%; overflow-x: auto; border-radius: var(--radius-md, 0.375rem); border: 1px solid var(--color-border, #e2e8f0); }
table { width: 100%; border-collapse: collapse; background: var(--color-surface, #fff); }
th, td { padding: 0.75rem 1rem; text-align: left; }
th { background: var(--color-bg-secondary, #f8fafc); font-weight: 600; color: var(--color-text, #1e293b); font-size: 0.875rem; border-bottom: 2px solid var(--color-border, #e2e8f0); }
td { border-bottom: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #1e293b); font-size: 0.875rem; }
tr:hover td { background: var(--color-bg-hover, #f8fafc); }
.sortable { cursor: pointer; user-select: none; }
.sortable:hover { background: var(--color-bg-hover, #e2e8f0); }
.sort-icon { display: inline-block; margin-left: 0.5rem; }
`;

export class DataTable extends UIComponent {
  static is = 'ui-data-table';

  @property({ type: String, reflect: true })
  columns = '';

  @property({ type: String, reflect: true })
  data = '';

  @property({ type: Boolean, reflect: true })
  sortable = false;

  @property({ type: Boolean, reflect: true })
  striped = false;

  private sortColumn = '';
  private sortDirection: 'asc' | 'desc' = 'asc';
  private tableData: any[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.data) {
      try { this.tableData = JSON.parse(this.data); } catch (e) { this.tableData = []; }
    }
  }

  protected _render() {
    const cols = this.columns.split(',').map(c => c.trim()).filter(Boolean);
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="table-container" part="container">
        <table part="table">
          <thead><tr>${cols.map(col => `<th class="${this.sortable ? 'sortable' : ''}" data-col="${col}">${col}<span class="sort-icon"></span></th>`).join('')}</tr></thead>
          <tbody>${this.tableData.map(row => `<tr>${cols.map(col => `<td>${row[col] || ''}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'columns') this.columns = newValue || '';
    else if (name === 'data') { this.data = newValue || ''; try { this.tableData = JSON.parse(newValue); } catch { this.tableData = []; } }
    else if (name === 'sortable') this.sortable = newValue !== null;
  }
}

customElements.define(DataTable.is, DataTable);
