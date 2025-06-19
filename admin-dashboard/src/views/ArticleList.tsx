import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { fetchArticles, deleteArticle } from '../controllers/articles.controller';

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
            } catch (err) {
                setError('Failed to load articles');
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await deleteArticle(id);
                setArticles(articles.filter(article => article.id !== id));
            } catch (err) {
                setError('Failed to delete article');
            }
        }
    };

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Article List</h1>
            <Link to="/articles/new">+ New Article</Link>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                        <button onClick={() => handleDelete(article.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;