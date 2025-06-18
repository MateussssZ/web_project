import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { articlesApiClient } from '@/lib/api/articles';
import { Article } from '@/lib/types/article';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ params }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="destructive">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <div className="flex space-x-2">
            <Button asChild>
              <Link href={`/admin/articles/${article.id}/edit`}>Edit</Link>
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin/articles')}>
              Back to List
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Created: {format(new Date(article.createdAt), 'MMM dd, yyyy')}
          </span>
          <span className="text-sm text-gray-600">
            Updated: {format(new Date(article.updatedAt), 'MMM dd, yyyy')}
          </span>
          {article.publishedAt && (
            <span className="text-sm text-gray-600">
              Published: {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
            </span>
          )}
          {getStatusBadge(article.status)}
        </div>

        {article.imageUrl && (
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {article.excerpt && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 italic">{article.excerpt}</p>
          </div>
        )}

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ArticleDetailPage;