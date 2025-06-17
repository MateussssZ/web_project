import React, { useEffect, useState } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { Header } from '@/components/Header';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Article } from '@/lib/types';

export default function MyArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchMyArticles = async () => {
      try {
        setIsLoading(true);
        const response = await api.getMyArticles();
        
        if (response.success && response.data) {
          setArticles(response.data);
        } else {
          setError(response.error || 'Failed to load your articles');
        }
      } catch (err) {
        setError('An error occurred while fetching your articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyArticles();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await api.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError('Failed to delete article');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            You need to be logged in to view your articles.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Articles</h1>
        
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
            You haven't created any articles yet.
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                isOwner={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}