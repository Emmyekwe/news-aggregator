import { ArticleSourceType } from './article';
import { fetchAPI } from '../utils/apiUtils';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

// fetch Guardian articles
export const fetchGuardianNews = async (
  query: string = 'world'
): Promise<GuardianArticle[]> => {
  const url = `https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`;
  const data = await fetchAPI<{ response: { results: GuardianArticle[] } }>(
    url,
    'Failed to fetch Guardian news'
  );
  return data.response.results;
};

export const toArticle = (article: GuardianArticle) => {
  return {
    id: article.id,
    title: article.webTitle,
    description: null,
    url: article.webUrl,
    imageUrl: null,
    publishedDate: article.webPublicationDate,
    source: 'The Guardian',
    author: null,
    category: article.sectionName,
    sourceType: ArticleSourceType.Guardian,
  };
};
