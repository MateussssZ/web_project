import { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';

const DARK_BG = '#18191a';
const CARD_BG = '#23272b';
const BORDER = '#2e3237';
const TEXT = '#e6e6e6';
const TITLE = '#fff';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: DARK_BG,
        fontFamily: "'PT Sans', Arial, sans-serif",
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
        body {
          margin: 0;
          background: ${DARK_BG};
          color: ${TEXT};
          font-family: 'PT Sans', Arial, sans-serif;
        }
      `}</style>
      <header
        style={{
          background: CARD_BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: '24px 0 16px 0',
          marginBottom: 32,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Минималистичная 2D SVG-иконка вместо <img> */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10, display: 'block' }}>
            <rect x="4" y="3" width="16" height="18" rx="3" fill="none" stroke="#6abf4b" strokeWidth="2"/>
            <line x1="7" y1="8" x2="17" y2="8" stroke="#6abf4b" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="12" x2="17" y2="12" stroke="#6abf4b" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="16" x2="13" y2="16" stroke="#6abf4b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-1px',
            margin: 0,
            color: TITLE,
          }}>
            Articles Hub
          </h1>
          <span style={{
            marginLeft: 'auto',
            color: '#6abf4b',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
            onClick={() => window.location.href = '/login'}
          >
            Выйти
          </span>
        </div>
      </header>
      <main
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 16px',
          minHeight: 400,
          animation: 'fadeIn 0.7s',
        }}
      >
        <div style={{
          background: CARD_BG,
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          padding: '32px 28px',
          marginBottom: 32,
          border: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
            <button
              style={{
                background: '#23272b',
                color: '#e6e6e6',
                border: '1.5px solid #6abf4b',
                borderRadius: 8,
                padding: '10px 22px',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
                transition: 'background 0.2s, box-shadow 0.2s, color 0.2s, border 0.2s, transform 0.15s',
                outline: 'none',
              }}
              onClick={() => window.location.href = '/articles/new'}
            >
              + Создать статью
            </button>
          </div>
          <div style={{ fontSize: 20, color: TEXT, marginBottom: 8 }}>
            Делитесь знаниями и вдохновляйтесь!
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, margin: '18px 0 0 0' }} />
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              <span className="loader" style={{
                display: 'inline-block',
                width: 28,
                height: 28,
                border: '3px solid #23272b',
                borderTop: '3px solid #6abf4b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: 12,
                verticalAlign: 'middle'
              }} />
              <span style={{ color: '#888', fontSize: 20 }}>Загрузка статей...</span>
            </div>
          ) : (
            <ArticleList />
          )}
        </div>
      </main>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default Home;