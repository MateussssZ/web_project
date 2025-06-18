import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../types';

const ArticleForm: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState<Article | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                const response = await fetch(`/api/articles/${id}`);
                const data = await response.json();
                setArticle(data);
                setTitle(data.title);
                setContent(data.content);
            };
            fetchArticle();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = article ? 'PUT' : 'POST';
        const url = article ? `/api/articles/${id}` : '/api/articles';

        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        router.push('/');
    };

    return (
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
            <button type="submit">{article ? 'Update Article' : 'Create Article'}</button>
        </form>
    );
};

export default ArticleForm;