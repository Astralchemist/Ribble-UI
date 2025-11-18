import React, { useState } from 'react';
import './common.css';

export interface Filter {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterPanelProps {
  filters: Filter[];
  onFilterChange: (filterId: string, value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterId]: value }));
    onFilterChange(filterId, value);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    filters.forEach((filter) => onFilterChange(filter.id, ''));
  };

  const activeFiltersCount = Object.values(selectedFilters).filter(Boolean).length;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <div className="filter-title-row">
          <h3 className="filter-title">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="filter-badge">{activeFiltersCount}</span>
          )}
        </div>
        <div className="filter-actions">
          {activeFiltersCount > 0 && (
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear all
            </button>
          )}
          <button
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="filter-content">
          {filters.map((filter) => (
            <div key={filter.id} className="filter-group">
              <label className="filter-label">{filter.label}</label>
              <select
                className="filter-select"
                value={selectedFilters[filter.id] || ''}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
