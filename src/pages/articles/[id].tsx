import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../../types';

  // Цвета для тёмной темы
const DARK_BG = '#18191a';
const CARD_BG = '#23272b';
const BORDER = '#2e3237';
const TEXT = '#e6e6e6';
const ACCENT = '#6abf4b';
const TITLE = '#fff';

const DEFAULT_IMAGE = 'https://habrastorage.org/getpro/habr/upload_files/2b7/7c7/7c7/2b77c77c7c7c7c7c7c7c7c7c7c7c7c7c.png';

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

  if (loading)
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: 80,
          color: TEXT,
          background: DARK_BG,
          minHeight: '100vh',
          fontFamily: "'PT Sans', Arial, sans-serif",
        }}
      >
        Загрузка...
      </div>
    );
  if (!article)
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: 80,
          color: TEXT,
          background: DARK_BG,
          minHeight: '100vh',
          fontFamily: "'PT Sans', Arial, sans-serif",
        }}
      >
        Статья не найдена
      </div>
    );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: DARK_BG,
        fontFamily: "'PT Sans', Arial, sans-serif",
        padding: '0 0 60px 0',
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
        body {
          margin: 0;
          background: #18191a;
          color: #e6e6e6;
          font-family: 'PT Sans', Arial, sans-serif;
        }
      `}</style>
      <div
        style={{
          background: CARD_BG,
          borderRadius: 14,
          boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
          border: `1px solid ${BORDER}`,
          padding: 0,
          maxWidth: 740,
          margin: '48px auto 0 auto',
          animation: 'fadeIn 0.7s',
          overflow: 'hidden',
        }}
      >
        {/* Картинка удалена */}
        <div style={{ padding: '36px 36px 28px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1
              style={{
                flex: 1,
                margin: 0,
                fontWeight: 700,
                fontSize: 28,
                color: TITLE,
                lineHeight: 1.2,
                letterSpacing: '-1px',
              }}
            >
              {article.title}
            </h1>
            {canEdit && (
              <button
                style={{
                  background: ACCENT,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 18px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 15,
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onClick={() => router.push(`/articles/${article.id}/edit`)}
              >
                Редактировать
              </button>
            )}
          </div>
          <div
            style={{
              margin: '32px 0 0 0',
              fontSize: 19,
              lineHeight: 1.7,
              color: TEXT,
              wordBreak: 'break-word',
              whiteSpace: 'pre-line',
              transition: 'color 0.2s',
            }}
          >
            {article.content}
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              background: 'linear-gradient(90deg, #23272b 0%, #2e3237 100%)',
              color: '#6abf4b',
              border: `1.5px solid #6abf4b`,
              borderRadius: 8,
              padding: '8px 20px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
              transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.15s',
              outline: 'none',
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 32,
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1, display: 'inline-block' }}>←</span>
            Назад
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default ArticleViewPage;