import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '../../components/ArticleForm';
import { Article } from '../../models/article';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const response = await fetch(`/api/articles/${id}`);
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      };
      fetchArticle();
    }
  }, [id]);

  const handleUpdate = async (updatedArticle: Article) => {
    await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedArticle),
    });
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Article</h1>
      {article && <ArticleForm article={article} onSubmit={handleUpdate} />}
    </div>
  );
};

export default ArticlePage;