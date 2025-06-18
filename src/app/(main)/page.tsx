import React, { useEffect, useState } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Article } from '@/lib/types';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await api.getArticles();
        if (response.success && response.data) {
          setArticles(response.data);
        } else {
          setError(response.error || 'Failed to load articles');
        }
      } catch (err) {
        setError('An error occurred while fetching articles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await api.searchArticles(query);
      if (response.success && response.data) {
        setArticles(response.data);
      } else {
        setError(response.error || 'Search failed');
      }
    } catch (err) {
      setError('An error occurred during search');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError('Failed to delete article');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No articles found. Be the first to create one!
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                isOwner={user?.id === article.authorId}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}