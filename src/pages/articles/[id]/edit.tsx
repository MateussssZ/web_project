import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../../../types';
import ArticleForm from '../../../components/ArticleForm';

const EditArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const response = await fetch(`/api/articles/${id}`);
        const data = await response.json();
        setArticle(data);

        // Проверяем user_id
        const match = document.cookie.match(/user=(\d+)/);
        const userId = match ? Number(match[1]) : null;
        setCanEdit(userId !== null && data.user_id === userId);

        setLoading(false);
      };
      fetchArticle();
    }
  }, [id]);

  const handleUpdate = async (updated: { title: string; content: string }) => {
    await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
    });
    router.push(`/articles/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Статья не найдена</div>;
  if (!canEdit) return <div style={{ color: 'red' }}>У вас нет прав для редактирования этой статьи.</div>;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      padding: 24,
      maxWidth: 700,
      margin: '32px auto 0 auto',
    }}>
      <h1>Редактировать статью</h1>
      <ArticleForm article={article} onSubmit={handleUpdate} />
      <button
        type="button"
        onClick={() => router.push(`/articles/${id}`)}
        style={{
          marginTop: 24,
          background: 'none',
          border: 'none',
          color: '#0070f3',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer',
          padding: 0,
          textDecoration: 'underline',
        }}
      >
        ← Назад к статье
      </button>
    </div>
  );
};

export default EditArticlePage;