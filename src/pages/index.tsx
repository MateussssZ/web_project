import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArticleList from '../components/ArticleList';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Articles</h1>
      <Link
        href="/articles/new"
        style={{
          display: 'block',
          margin: '20px 0',
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: '5px',
          textDecoration: 'none'
        }}
      >
        Create New Article
      </Link>
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ArticleList />
      )}
    </div>
  );
};

export default Home;