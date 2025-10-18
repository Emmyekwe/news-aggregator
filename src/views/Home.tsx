import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import { type FilterOptions } from "../components/Filter";
import { type UserPreferences } from "../components/Preferences";
import { useArticleViewModel } from "../viewmodels/articleViewModel";
import { usePersistedState } from "../hooks/usePersistedState";
import { useArticleFiltering } from "../hooks/useArticleFiltering";
import { usePagination } from "../hooks/usePagination";

const ITEMS_PER_PAGE = 20;

const Home: React.FC = () => {
  const { articles, loading, error } = useArticleViewModel();
  const [viewMode, setViewMode] = useState<'all' | 'personalized'>('all');

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    selectedSources: [],
    selectedCategories: [],
    dateRange: 'all',
    sortBy: 'recent',
  });


  // Persisted preferences
  const [preferences, setPreferences] = usePersistedState<UserPreferences>('userPreferences', {
    preferredSources: [],
    preferredCategories: [],
    preferredAuthors: [],
  });

  // Computed values
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    articles.forEach(article => {
      if (article.category) categories.add(article.category);
    });
    return Array.from(categories).sort();
  }, [articles]);

  // Apply filtering logic
  const filteredArticles = useArticleFiltering(articles, filters, preferences, viewMode);

  // Apply pagination logic
  const { paginatedItems: paginatedArticles, currentPage, totalPages, setCurrentPage } = usePagination(
    filteredArticles,
    ITEMS_PER_PAGE
  );

  return (
    <div className="bg-bg-main flex flex-col min-h-screen">
      <Header
        filters={filters}
        onFilterChange={setFilters}
        preferences={preferences}
        onPreferencesChange={setPreferences}
        availableCategories={availableCategories}
      />
      <div className="flex-grow p-4 sm:p-6">
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition cursor-pointer ${
              viewMode === 'all'
                ? 'bg-primary text-white'
                : 'bg-bg-white text-text-secondary hover:bg-bg-hover'
            }`}
          >
            All Articles
          </button>
          <button
            onClick={() => setViewMode('personalized')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition cursor-pointer ${
              viewMode === 'personalized'
                ? 'bg-primary text-white'
                : 'bg-bg-white text-text-secondary hover:bg-bg-hover'
            }`}
          >
            For You
          </button>
        </div>

        {loading && (
          <p className="text-center mt-8 text-gray-500">
            Loading news from multiple sources...
          </p>
        )}
        
        {error && (
          <p className="text-center text-red-500 mt-8">{error}</p>
        )}

        {!loading && filteredArticles.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredArticles.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} of {filteredArticles.length} articles
            {filteredArticles.length !== articles.length && ` (filtered from ${articles.length})`}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {!loading && paginatedArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {!loading && filteredArticles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {!loading && filteredArticles.length === 0 && !error && (
          <div className="text-center mt-12">
            {viewMode === 'personalized' && 
             preferences.preferredSources.length === 0 &&
             preferences.preferredCategories.length === 0 &&
             preferences.preferredAuthors.length === 0 ? (
              <>
                <p className="text-accent text-lg mb-2">No preferences set</p>
              </>
            ) : (
              <>
                <p className="text-accent text-lg mb-2">No articles found</p>
       
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
