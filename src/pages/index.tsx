import { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        padding: '32px 12px',
        maxWidth: '700px',
        margin: 'auto',
        background: '#f5f6fa',
        minHeight: '100vh',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
      }}
    >
      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>Loading articles...</p>
      ) : (
        <ArticleList />
      )}
    </div>
  );
};

export default Home;