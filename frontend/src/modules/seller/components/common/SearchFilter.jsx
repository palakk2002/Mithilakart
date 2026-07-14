/**
 * SearchFilter Component
 * Combined search + filter bar for table pages.
 */
import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from '../../../../shared/components/SearchInput';

const SearchFilter = ({
  searchValue = '',
  onSearchChange,
  placeholder = 'Search...',
  filters = [],
  activeFilters = {},
  onFilterChange,
  className = '',
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeCount = Object.values(activeFilters).filter((v) => v && v !== 'all').length;

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <SearchInput
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          rightElement={
            searchValue && (
              <button
                onClick={() => onSearchChange?.('')}
                className="text-gray-300 hover:text-gray-500"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )
          }
        />
      </div>

      {/* Filter Button */}
      {filters.length > 0 && (
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all
              ${showFilters || activeCount > 0
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 space-y-4"
              >
                {filters.map((filter) => (
                  <div key={filter.key}>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {filter.label}
                    </label>
                    <select
                      value={activeFilters[filter.key] || 'all'}
                      onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none"
                    >
                      <option value="all">All</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {activeCount > 0 && (
                  <button
                    onClick={() => {
                      filters.forEach((f) => onFilterChange?.(f.key, 'all'));
                    }}
                    className="w-full text-xs text-blue-600 font-medium hover:text-blue-800 text-center py-1"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
