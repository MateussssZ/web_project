'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Article = {
  id: number;
  title: string;
  status: 'published' | 'draft';
  date: string;
  content: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загрузка статей (замените на реальный API-вызов)
    const fetchArticles = async () => {
      try {
        // Имитация загрузки
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setArticles([
          {
            id: 1,
            title: 'Getting Started with Next.js',
            status: 'published',
            date: '2023-10-15',
            content: '...'
          },
          {
            id: 2,
            title: 'Advanced React Patterns',
            status: 'draft',
            date: '2023-10-20',
            content: '...'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        // Имитация удаления
        await new Promise(resolve => setTimeout(resolve, 300));
        setArticles(articles.filter(article => article.id !== id));
        alert('Article deleted successfully');
      } catch (error) {
        alert('Failed to delete article');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading articles...</div>;
  }

  return (
    <div className="articles-container">
      <div className="articles-header">
        <h2>Articles Management</h2>
        <Link href="/admin/articles/create" className="button primary">
          Create New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <table className="articles-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>
                  <span className={`status-badge ${article.status}`}>
                    {article.status}
                  </span>
                </td>
                <td>{article.date}</td>
                <td className="actions">
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="button edit"
                  >
                    Edit
                  </Link>
                  <button
                    className="button danger"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}