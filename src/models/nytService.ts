import { ArticleSourceType } from './article';
import { fetchAPI } from '../utils/apiUtils';

const NYT_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;

export interface NYTArticle {
  uri: string;
  url: string;
  id: number;
  source: string;
  published_date: string;
  section: string;
  byline: string;
  title: string;
  abstract: string;
  media: {
    'media-metadata'?: { url: string; format: string; height: number; width: number }[];
  }[];
}

// fetch NYT articles
export const fetchNYTNews = async (): Promise<NYTArticle[]> => {
  const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${NYT_API_KEY}`;
  const data = await fetchAPI<{ results: NYTArticle[] }>(
    url,
    'Failed to fetch New York Times news'
  );
  return data.results;
};

export const toArticle = (article: NYTArticle) => {
  const image = article.media?.[0]?.['media-metadata']?.find(
    m => m.format === 'mediumThreeByTwo440'
  )?.url || article.media?.[0]?.['media-metadata']?.[0]?.url || null;

  return {
    id: article.uri,
    title: article.title,
    description: article.abstract,
    url: article.url,
    imageUrl: image,
    publishedDate: article.published_date,
    source: 'The New York Times',
    author: article.byline,
    category: article.section,
    sourceType: ArticleSourceType.NYT,
  };
};
