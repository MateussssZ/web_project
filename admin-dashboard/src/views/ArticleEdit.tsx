import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Article } from '../types';
import { getArticleById, updateArticle } from '../controllers/articles.controller';

const ArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleById(Number(id));
        setArticle(fetchedArticle);
        setTitle(fetchedArticle.title);
        setContent(fetchedArticle.content);
      } catch (err) {
        setError('Failed to fetch article');
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      await updateArticle(Number(id), { title, content });
      history.push('/articles');
    } catch (err) {
      setError('Failed to update article');
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Article</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
};

export default ArticleEdit;