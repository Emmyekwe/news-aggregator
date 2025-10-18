import React from "react";
import type { ArticleWithSource } from "../models/article";
import { ArticleSourceType } from "../models/article";
import NewsImg from "../assets/newsaggregator.png"
import { formatDate } from "../utils/dateUtils";

interface NewsCardProps {
  article: ArticleWithSource;
}

// style for source badge
const getSourceBadgeStyle = (sourceType: string) => {
  switch (sourceType) {
    case ArticleSourceType.NewsAPI:
      return "bg-purple-100 text-purple-800";
    case ArticleSourceType.Guardian:
      return "bg-orange-100 text-orange-800";
    case ArticleSourceType.NYT:
      return "bg-gray-800 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// fetch article source label 
const getSourceLabel = (sourceType: string) => {
  switch (sourceType) {
    case ArticleSourceType.NewsAPI:
      return "NewsAPI";
    case ArticleSourceType.Guardian:
      return "Guardian";
    case ArticleSourceType.NYT:
      return "NYT";
    default:
      return "Unknown";
  }
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 p-4 relative cursor-pointer">
      <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded ${getSourceBadgeStyle(article.sourceType)}`}>
        {getSourceLabel(article.sourceType)}
      </span>
      <img
  src={article.imageUrl || NewsImg}
  alt={article.title}
  className="rounded-md mb-4 w-full h-48 object-cover"
/>
      <h2 className="font-semibold text-black text-lg mb-2">{article.title}</h2>
      {article.description && (
        <p className="text-black text-sm mb-2">{article.description}</p>
      )}
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-black">Source: {article.source}</p>
        {article.category && (
          <span className="text-xs bg-accent-light text-accent px-2 py-1 rounded">
            {article.category}
          </span>
        )}
      </div>
      {article.author && (
        <p className="text-xs text-gray-500 mb-2">By {article.author}</p>
      )}
     <p className="text-xs text-gray-400 mb-2">
        {formatDate(article.publishedDate)}
        </p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent text-sm font-medium hover:underline"
      >
        Read more →
      </a>
    </div>
  );
};

export default NewsCard;
