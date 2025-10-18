import { ArticleSourceType } from '../models/article';


export const NEWS_SOURCES = [
  { value: ArticleSourceType.NewsAPI, label: 'NewsAPI' },
  { value: ArticleSourceType.Guardian, label: 'The Guardian' },
  { value: ArticleSourceType.NYT, label: 'New York Times' },
] as const;

export type NewsSource = typeof NEWS_SOURCES[number];
