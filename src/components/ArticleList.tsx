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
            <h1>Articles</h1>
            <Link href="/articles/new">Create New Article</Link>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <Link href={`/articles/${article.id}`}>
                            {article.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;