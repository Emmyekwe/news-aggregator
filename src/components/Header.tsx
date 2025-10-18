import React from 'react';
import { Link } from 'react-router-dom';
import Filter, { type FilterOptions } from './Filter';
import Preferences, { type UserPreferences } from './Preferences';

interface HeaderProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  availableCategories: string[];
}

const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  preferences,
  onPreferencesChange,
  availableCategories,
}) => {
  return (
    <header className='bg-bg-dark top-0 z-10 shadow-sm'>
      <div className='flex flex-col gap-2 md:flex-row  justify-between md:items-center px-4 py-4'>
        <Link to="/" className='text-xl text-text-white font-bold transition'>
          News Aggregator
        </Link>
        
        <div className='flex items-center gap-4'>
          <Filter
            filters={filters}
            onFilterChange={onFilterChange}
            availableCategories={availableCategories}
          />
          <Preferences
            preferences={preferences}
            onPreferencesChange={onPreferencesChange}
            availableCategories={availableCategories}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;