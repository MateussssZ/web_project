import React, { useEffect, useState } from 'react';
import { Article, ArticlesResponse } from '@/lib/types/article';
import { articlesApiClient } from '@/lib/api/articles';
import ArticleTable from '@/components/admin/ArticleTable';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await articlesApiClient.getArticles();
        setArticles(response.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        toast.error('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await articlesApiClient.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
      toast.success('Article deleted successfully');
    } catch (error) {
      console.error('Failed to delete article:', error);
      toast.error('Failed to delete article');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const updatedArticle = await articlesApiClient.publishArticle(id);
      setArticles(articles.map(article => 
        article.id === id ? updatedArticle : article
      ));
      toast.success('Article published successfully');
    } catch (error) {
      console.error('Failed to publish article:', error);
      toast.error('Failed to publish article');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const updatedArticle = await articlesApiClient.archiveArticle(id);
      setArticles(articles.map(article => 
        article.id === id ? updatedArticle : article
      ));
      toast.success('Article archived successfully');
    } catch (error) {
      console.error('Failed to archive article:', error);
      toast.error('Failed to archive article');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Articles</h1>
          <Button onClick={() => router.push('/admin/articles/create')}>
            Create New Article
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <ArticleTable
            articles={articles}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ArticlesPage;