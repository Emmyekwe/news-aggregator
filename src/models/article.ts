export interface Article {
    id: string;
    title: string;
    description: string | null;
    url: string;
    imageUrl: string | null;
    publishedDate: string;
    source: string;
    author: string | null;
    category: string | null;
  }
  
  export const ArticleSourceType = {
    NewsAPI: 'newsapi',
    Guardian: 'guardian',
    NYT: 'nyt',
  } as const;
  
  export type ArticleSourceType = typeof ArticleSourceType[keyof typeof ArticleSourceType];
  
  export interface ArticleWithSource extends Article {
    sourceType: ArticleSourceType;
  }
  