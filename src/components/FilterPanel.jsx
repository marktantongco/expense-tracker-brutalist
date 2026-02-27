import { useState } from 'react';
import './FilterPanel.css';

export const FilterPanel = ({ onFilterChange, onClose }) => {
  const [filters, setFilters] = useState({
    category: '',
    type: 'all', // 'all', 'income', 'expense'
    search: '',
    minAmount: '',
    maxAmount: ''
  });

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const emptyFilters = {
      category: '',
      type: 'all',
      search: '',
      minAmount: '',
      maxAmount: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>🔍 FILTERS</h3>
        <button className="close-filter-btn" onClick={onClose}>✕</button>
      </div>

      <div className="filter-content">
        {/* Search */}
        <div className="filter-group">
          <label>SEARCH</label>
          <input
            type="text"
            placeholder="Description or reference..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Type */}
        <div className="filter-group">
          <label>TYPE</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filters.type === 'all' ? 'active' : ''}`}
              onClick={() => handleChange('type', 'all')}
            >
              ALL
            </button>
            <button
              className={`filter-btn ${filters.type === 'income' ? 'active' : ''}`}
              onClick={() => handleChange('type', 'income')}
            >
              INCOME
            </button>
            <button
              className={`filter-btn ${filters.type === 'expense' ? 'active' : ''}`}
              onClick={() => handleChange('type', 'expense')}
            >
              EXPENSE
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="filter-group">
          <label>CATEGORY</label>
          <input
            type="text"
            placeholder="Filter by category..."
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Amount Range */}
        <div className="filter-group">
          <label>AMOUNT RANGE</label>
          <div className="amount-range">
            <input
              type="number"
              placeholder="Min"
              value={filters.minAmount}
              onChange={(e) => handleChange('minAmount', e.target.value)}
              className="filter-input-small"
            />
            <span className="range-separator">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxAmount}
              onChange={(e) => handleChange('maxAmount', e.target.value)}
              className="filter-input-small"
            />
          </div>
        </div>

        {/* Clear Button */}
        <button className="btn-clear-filters" onClick={handleClear}>
          ⟲ CLEAR ALL FILTERS
        </button>
      </div>
    </div>
  );
};
