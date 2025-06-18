import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ArticleForm from '@/components/admin/ArticleForm';
import { articlesApiClient } from '@/lib/api/articles';
import { Article, ArticleUpdatePayload } from '@/lib/types/article';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

const EditArticlePage: React.FC<EditArticlePageProps> = ({ params }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await articlesApiClient.getArticleById(params.id);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error('Failed to fetch article:', error);
        toast.error('Failed to load article');
        router.push('/admin/articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [params.id, router]);

  const handleSubmit = async (values: ArticleUpdatePayload) => {
    try {
      setIsSubmitting(true);
      await articlesApiClient.updateArticle(params.id, values);
      toast.success('Article updated successfully');
      router.push(`/admin/articles/${params.id}`);
    } catch (error) {
      console.error('Failed to update article:', error);
      toast.error('Failed to update article');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!article) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Article not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Edit Article</h1>
        <ArticleForm
          article={article}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </DashboardLayout>
  );
};

export default EditArticlePage;