import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArticleCard } from '@/components/ArticleCard';
import { Header } from '@/components/Header';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Article } from '@/lib/types';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await api.getArticle(id as string);
        
        if (response.success && response.data) {
          setArticle(response.data);
        } else {
          setError(response.error || 'Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!article) return;
    
    try {
      await api.deleteArticle(article.id);
      router.push('/');
    } catch (err) {
      setError('Failed to delete article');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Article not found'}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>By {article.authorName}</span>
            <span className="mx-2">•</span>
            <span>Published: {new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          
          {article.tags && article.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {user?.id === article.authorId && (
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Article
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}