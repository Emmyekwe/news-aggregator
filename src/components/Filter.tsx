import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import Modal from './Modal';
import { NEWS_SOURCES } from '../constants/sources';
import { useArrayToggle } from '../hooks/useArrayToggle';

export interface FilterOptions {
  searchQuery: string;
  selectedSources: string[];
  selectedCategories: string[];
  dateRange: 'all' | 'today' | 'week' | 'month';
  sortBy: 'recent' | 'oldest';
}

interface FilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  availableCategories: string[];
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange, availableCategories }) => {
  const [isOpen, setIsOpen] = useState(false);

//   toggle article source and category
  const toggleSource = useArrayToggle(
    filters.selectedSources,
    (newSources) => onFilterChange({ ...filters, selectedSources: newSources })
  );

  const toggleCategory = useArrayToggle(
    filters.selectedCategories,
    (newCategories) => onFilterChange({ ...filters, selectedCategories: newCategories })
  );

//   clear filters
  const clearFilters = () => {
    onFilterChange({
      searchQuery: '',
      selectedSources: [],
      selectedCategories: [],
      dateRange: 'all',
      sortBy: 'recent',
    });
  };

  const activeFilterCount = 
    filters.selectedSources.length + 
    filters.selectedCategories.length + 
    (filters.dateRange !== 'all' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="flex flex-col text-white sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
      <div className="flex flex-row gap-2 items-center w-full sm:w-auto relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          className="flex-1 sm:w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-lg border border-gray-300 transition"
        >
          <FiFilter className="text-xl text-white cursor-pointer" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Filters"
          fullScreen={true}
          headerActions={
            <button
              onClick={clearFilters}
              className="text-sm text-black cursor-pointer hover:underline"
            >
              Clear all
            </button>
          }
        >

              <div className="space-y-6 text-black">
                <div>
                  <label className="block text-sm text-black font-medium mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-black font-medium mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-black font-medium mb-3">Sources</label>
                  <div className="space-y-2">
                    {NEWS_SOURCES.map((source) => (
                      <label key={source.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={filters.selectedSources.includes(source.value)}
                          onChange={() => toggleSource(source.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">{source.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {availableCategories.length > 0 && (
                  <div>
                    <label className="block text-sm text-black font-medium mb-3">Categories</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableCategories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-6 bg-black text-white py-2 rounded-lg cursor-pointer transition"
          >
            Apply Filters
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Filter;
