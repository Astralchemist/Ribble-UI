import { useState } from 'react';

export interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  searchable?: boolean;
  filterable?: boolean;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  itemsPerPage?: number;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  selectable = false,
  onSelectionChange,
  searchable = true,
  filterable = false,
  filters,
  actions,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (columnKey: keyof T) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(filteredData.map((_, index) => index));
      setSelectedRows(allIndices);
      onSelectionChange?.(filteredData);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected).map((i) => filteredData[i]));
  };

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    searchable && searchTerm
      ? Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue === bValue) return 0;

    const comparison = aValue > bValue ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="data-table-container">
      {(searchable || filterable || actions || selectedRows.size > 0) && (
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            {selectedRows.size > 0 && (
              <div className="bulk-actions">
                <span className="bulk-actions-label">
                  {selectedRows.size} selected
                </span>
              </div>
            )}
            {searchable && (
              <input
                type="text"
                className="table-search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            )}
            {filterable && filters}
          </div>
          <div className="table-toolbar-right">{actions}</div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th style={{ width: '50px' }}>
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    checked={
                      selectedRows.size > 0 && selectedRows.size === filteredData.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={String(column.key)}>
                  <div
                    className={`th-content ${column.sortable ? 'sortable' : ''}`}
                    onClick={() =>
                      column.sortable && column.key !== 'actions' && handleSort(column.key as keyof T)
                    }
                  >
                    <span>{column.label}</span>
                    {column.sortable && sortColumn === column.key && (
                      <span className="sort-indicator">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ textAlign: 'center', padding: '40px' }}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <div className="empty-state-title">No data found</div>
                    <div className="empty-state-message">
                      {searchTerm
                        ? 'Try adjusting your search criteria'
                        : 'No records to display'}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const globalIndex = startIndex + rowIndex;
                return (
                  <tr
                    key={rowIndex}
                    onClick={() => !selectable && onRowClick?.(row)}
                    className={`${onRowClick && !selectable ? 'clickable' : ''} ${
                      selectedRows.has(globalIndex) ? 'selected' : ''
                    }`}
                  >
                    {selectable && (
                      <td>
                        <input
                          type="checkbox"
                          className="table-checkbox"
                          checked={selectedRows.has(globalIndex)}
                          onChange={(e) => handleSelectRow(globalIndex, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={String(column.key)}>
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)}{' '}
            of {sortedData.length} entries
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
