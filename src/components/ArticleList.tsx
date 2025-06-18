import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article } from '../types';

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('/api/articles');
            const data = await response.json();
            setArticles(data);
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Articles</h1>
            <Link
                href="/articles/new"
                style={{
                    display: 'inline-block',
                    margin: '0 auto 24px auto',
                    padding: '10px 24px',
                    background: '#0070f3',
                    color: '#fff',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: 500,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'background 0.2s'
                }}
            >
                + New Article
            </Link>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 32 }}>
                {articles.map(article => (
                    <li
                        key={article.id}
                        style={{
                            marginBottom: 18,
                            background: '#fafbfc',
                            borderRadius: 6,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                            padding: '18px 20px',
                            transition: 'box-shadow 0.2s',
                        }}
                    >
                        <Link
                            href={`/articles/${article.id}`}
                            style={{
                                color: '#222',
                                fontSize: 20,
                                fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                        >
                            {article.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;