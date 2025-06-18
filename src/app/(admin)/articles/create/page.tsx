import React, { useState } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ArticleForm from '@/components/admin/ArticleForm';
import { articlesApiClient } from '@/lib/api/articles';
import { ArticleCreatePayload } from '@/lib/types/article';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateArticlePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: ArticleCreatePayload) => {
    try {
      setIsSubmitting(true);
      await articlesApiClient.createArticle(values);
      toast.success('Article created successfully');
      router.push('/admin/articles');
    } catch (error) {
      console.error('Failed to create article:', error);
      toast.error('Failed to create article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New Article</h1>
        <ArticleForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateArticlePage;