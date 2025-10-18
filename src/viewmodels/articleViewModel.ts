import { useState, useEffect } from 'react';
import { fetchNews, toArticle as newsToArticle, type NewsApiArticle } from '../models/newsService';
import { fetchGuardianNews, toArticle as guardianToArticle, type GuardianArticle } from '../models/guardianService';
import { fetchNYTNews, toArticle as nytToArticle, type NYTArticle } from '../models/nytService';
import type { ArticleWithSource } from '../models/article';
import { sortByDateDesc } from '../utils/dateUtils';

export const useArticleViewModel = () => {
  const [articles, setArticles] = useState<ArticleWithSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllNews = async () => {
      try {
        setLoading(true);
        
        // Fetch NewsAPI from multiple categories
        const newsCategories = ['business', 'technology', 'sports', 'entertainment'];
        const newsPromises = newsCategories.map(category => fetchNews(category));
        
        const results = await Promise.allSettled([
          ...newsPromises,
          fetchGuardianNews('world'),
          fetchNYTNews(),
        ]);

        // Split results
        const newsResults = results.slice(0, newsCategories.length);
        const guardianResult = results[newsCategories.length];
        const nytResult = results[newsCategories.length + 1];

        const allArticles: ArticleWithSource[] = [];

        // Process all NewsAPI results
        newsResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const articles = result.value as NewsApiArticle[];
            allArticles.push(...articles.map(newsToArticle));
          } else {
            console.error(`NewsAPI fetch failed for category ${newsCategories[index]}:`, result.reason);
          }
        });

        if (guardianResult.status === 'fulfilled') {
          const articles = guardianResult.value as GuardianArticle[];
          allArticles.push(...articles.map(guardianToArticle));
        } else {
          console.error('Guardian API fetch failed:', guardianResult.reason);
        }

        if (nytResult.status === 'fulfilled') {
          const articles = nytResult.value as NYTArticle[];
          allArticles.push(...articles.map(nytToArticle));
        } else {
          console.error('NYT API fetch failed:', nytResult.reason);
        }

        allArticles.sort((a, b) => sortByDateDesc(a.publishedDate, b.publishedDate));

        setArticles(allArticles);
        
        // Set error message only if all news sources fail to fetch
        const allNewsApiFailed = newsResults.every(result => result.status === 'rejected');
        if (allNewsApiFailed && 
            guardianResult.status === 'rejected' && 
            nytResult.status === 'rejected') {
          setError('Failed to fetch news from all sources');
        }
      } catch (err) {
        setError('An unexpected error occurred while fetching news');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllNews();
  }, []);

  return { articles, loading, error };
};
