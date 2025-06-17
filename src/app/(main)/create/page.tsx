import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ArticleEditor } from '@/components/ArticleEditor';
import { Header } from '@/components/Header';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export default function CreateArticlePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (article: { title: string; content: string; tags?: string[] }) => {
    if (!user) {
      setError('You must be logged in to create an article');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const response = await api.createArticle(article);
      
      if (response.success && response.data) {
        router.push(`/article/${response.data.id}`);
      } else {
        setError(response.error || 'Failed to create article');
      }
    } catch (err) {
      setError('An error occurred while creating the article');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            You need to be logged in to create an article.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <ArticleEditor 
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </main>
    </div>
  );
}