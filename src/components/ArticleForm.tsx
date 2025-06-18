import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../types';

const ArticleForm: React.FC<{ article?: Article; onSubmit?: (data: { title: string; content: string }) => void }> = ({
    article,
    onSubmit,
}) => {
    const [title, setTitle] = useState(article?.title || '');
    const [content, setContent] = useState(article?.content || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ title, content });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: 24,
                maxWidth: 500,
                margin: '32px auto 0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
            }}
        >
            <div>
                <label htmlFor="title" style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 5,
                        border: '1px solid #eaeaea',
                        fontSize: 16,
                    }}
                />
            </div>
            <div>
                <label htmlFor="content" style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={8}
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 5,
                        border: '1px solid #eaeaea',
                        fontSize: 16,
                        resize: 'vertical',
                    }}
                />
            </div>
            <button
                type="submit"
                style={{
                    background: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 5,
                    padding: '12px 0',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    marginTop: 8,
                    transition: 'background 0.2s',
                }}
            >
                {article ? 'Update Article' : 'Create Article'}
            </button>
        </form>
    );
};

export default ArticleForm;