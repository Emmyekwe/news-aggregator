import { useMemo } from 'react';
import type { ArticleWithSource } from '../models/article';
import type { FilterOptions } from '../components/Filter';
import type { UserPreferences } from '../components/Preferences';
import { sortByDateDesc, sortByDateAsc } from '../utils/dateUtils';


export const useArticleFiltering = (
  articles: ArticleWithSource[],
  filters: FilterOptions,
  preferences: UserPreferences,
  viewMode: 'all' | 'personalized'
): ArticleWithSource[] => {
  return useMemo(() => {
    let filtered = [...articles];

    // personalized feed filtering
    if (viewMode === 'personalized') {
      const hasPreferences = 
        preferences.preferredSources.length > 0 ||
        preferences.preferredCategories.length > 0 ||
        preferences.preferredAuthors.length > 0;

      if (hasPreferences) {
        filtered = filtered.filter(article => {
          const sourceCheck = preferences.preferredSources.length === 0 || 
            preferences.preferredSources.includes(article.sourceType);
          
          const categoryCheck = preferences.preferredCategories.length === 0 || 
            (article.category && preferences.preferredCategories.includes(article.category));
          
          const authorCheck = preferences.preferredAuthors.length === 0 || 
            (article.author && preferences.preferredAuthors.some(a => 
              article.author?.toLowerCase().includes(a.toLowerCase())
            ));
          
          return sourceCheck && categoryCheck && authorCheck;
        });
      }
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.author?.toLowerCase().includes(query)
      );
    }

    // Apply source filter
    if (filters.selectedSources.length > 0) {
      filtered = filtered.filter(article =>
        filters.selectedSources.includes(article.sourceType)
      );
    }

    // Apply category filter
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        article.category && filters.selectedCategories.includes(article.category)
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setDate(now.getDate() - 30);
          break;
      }

      filtered = filtered.filter(article =>
        new Date(article.publishedDate) >= cutoff
      );
    }

    // Apply sorting
    filtered.sort((a, b) => 
      filters.sortBy === 'recent' 
        ? sortByDateDesc(a.publishedDate, b.publishedDate)
        : sortByDateAsc(a.publishedDate, b.publishedDate)
    );

    return filtered;
  }, [articles, filters, preferences, viewMode]);
};
