import { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '../../components/ArticleForm';

const DARK_BG = '#18191a';
const CARD_BG = '#23272b';
const BORDER = '#2e3237';
const TEXT = '#e6e6e6';

const NewArticle = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (articleData: { title: string; content: string }) => {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (response.ok) {
      const data = await response.json()
      try {
        const res = await fetch("http://localhost:3003/notify",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
          title: data.title,
          createdAt: data.createdAt,
          url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/articles/${data.id}`
         }),
        })

        if (!res.ok){
          throw new Error()
        }
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
      router.push('/');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Что-то пошло не так');
    }
  };

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
          background: ${DARK_BG};
          color: ${TEXT};
          font-family: 'PT Sans', Arial, sans-serif;
        }
        input, textarea {
          background: #23272b !important;
          color: #e6e6e6 !important;
          border: 1px solid #2e3237 !important;
        }
        input:focus, textarea:focus {
          border-color: #6abf4b !important;
        }
      `}</style>
      <div
        style={{
          background: CARD_BG,
          borderRadius: 14,
          boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
          border: `1px solid ${BORDER}`,
          padding: '36px 36px 28px 36px',
          maxWidth: 600,
          margin: '48px auto 0 auto',
          animation: 'fadeIn 0.7s',
          position: 'relative',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            Создать статью
          </h1>
        </div>
        {error && (
          <div style={{ color: '#ff6b6b', marginBottom: 18, fontWeight: 500 }}>
            {error}
          </div>
        )}
        <ArticleForm onSubmit={handleSubmit} />
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

export default NewArticle;