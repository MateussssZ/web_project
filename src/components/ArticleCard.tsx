import React from 'react';
import Link from 'next/link';
import { Article } from '../lib/types';
import { formatDate } from '../lib/utils';

interface ArticleCardProps {
  article: Article;
  showAuthor?: boolean;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  showAuthor = true,
  onDelete,
  isOwner = false,
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/article/${article.id}`} className="block">
        <h2 className="text-xl font-bold mb-2 text-blue-600 hover:text-blue-800">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {article.content.substring(0, 150)}...
        </p>
      </Link>
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-gray-500">
          {showAuthor && (
            <span className="mr-2">By {article.authorName}</span>
          )}
          <span>Published: {formatDate(article.createdAt)}</span>
        </div>
        
        {isOwner && onDelete && (
          <button
            onClick={() => onDelete(article.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        )}
      </div>
      
      {article.tags && article.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {article.tags.map(tag => (
            <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};