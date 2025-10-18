import { ArticleSourceType } from './article';
import { fetchAPI } from '../utils/apiUtils';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export interface NewsApiArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string | null;
}

// fetch news articles
export const fetchNews = async (category?: string): Promise<NewsApiArticle[]> => {
  const categoryParam = category ? `&category=${category}` : '';
  const url = `https://newsapi.org/v2/top-headlines?country=us${categoryParam}&apiKey=${API_KEY}`;
  
  const data = await fetchAPI<{ articles: NewsApiArticle[] }>(url, 'Failed to fetch news');
  const articles = data.articles;
  
  if (category) {
    articles.forEach(article => {
      article.category = category;
    });
  }
  
  return articles;
};

export const toArticle = (article: NewsApiArticle) => {
  return {
    id: article.url,
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    publishedDate: article.publishedAt,
    source: article.source.name,
    author: article.author,
    category: article.category || null,
    sourceType: ArticleSourceType.NewsAPI,
  };
};
