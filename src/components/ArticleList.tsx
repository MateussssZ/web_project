import Link from 'next/link';
import { useEffect, useState } from 'react';

const CARD_BG = '#23272b';
const BORDER = '#2e3237';
const TEXT = '#e6e6e6';
const ICON = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d5.svg'; // минималистичная иконка книги

const ArticleList = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  // Новые статьи сверху
  const articlesToShow = [...articles].reverse();

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {articlesToShow.map(article => (
        <li
          key={article.id}
          style={{
            marginBottom: 18,
            background: CARD_BG,
            borderRadius: 8,
            boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
            padding: '16px 22px',
            border: `1px solid ${BORDER}`,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            transition: 'box-shadow 0.2s, background 0.2s',
            cursor: 'pointer',
            animation: 'fadeInUp 0.5s',
          }}
        >
          {/* Минималистичная 2D иконка-документ SVG */}
          <span style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="3" width="16" height="18" rx="3" fill="none" stroke="#6abf4b" strokeWidth="2"/>
              <line x1="7" y1="8" x2="17" y2="8" stroke="#6abf4b" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="7" y1="12" x2="17" y2="12" stroke="#6abf4b" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="7" y1="16" x2="13" y2="16" stroke="#6abf4b" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <Link href={`/articles/${article.id}`} legacyBehavior>
            <a style={{
              color: TEXT,
              fontSize: 20,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>
              {article.title}
            </a>
          </Link>
        </li>
      ))}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </ul>
  );
};

export default ArticleList;