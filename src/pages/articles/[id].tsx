import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '../../components/ArticleForm';
import { Article } from '../../types';

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
        // Ensure user_id is present in the fetched data
        if (!('user_id' in data)) {
          throw new Error('Fetched article is missing user_id');
        }
        setArticle(data);
        setLoading(false);
      };
      fetchArticle();
    }
  }, [id]);

  const handleUpdate = async (data: { title: string; content: string }) => {
    if (!article) return;
    const updatedArticle: Article = {
      ...article,
      title: data.title,
      content: data.content,
    };
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