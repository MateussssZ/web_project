import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '../../components/ArticleForm';
import { Article } from '../../types';

const ArticleViewPage = () => {
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
        // Ensure user_id is present in the fetched data
        if (!('user_id' in data)) {
          throw new Error('Fetched article is missing user_id');
        }
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
  if (!article) return <div>Статья не найдена</div>;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      padding: 24,
      maxWidth: 700,
      margin: '32px auto 0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <h1 style={{ flex: 1, margin: 0 }}>{article.title}</h1>
        {canEdit && (
          <button
            style={{
              background: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: 5,
              padding: '8px 16px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
            onClick={() => router.push(`/articles/${article.id}/edit`)}
          >
            Редактировать
          </button>
        )}
      </div>
      <div style={{ margin: '32px 0', fontSize: 18, lineHeight: 1.7 }}>
        {article.content}
      </div>
      <button
        type="button"
        onClick={() => router.back()}
        style={{
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
        ← Назад
      </button>
    </div>
  );
};

export default ArticleViewPage;