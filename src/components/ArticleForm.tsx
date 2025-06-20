import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../types';
import Button from './Button';

const ArticleForm: React.FC<{ article?: Article; onSubmit?: (data: { title: string; content: string }) => void }> = ({
    article,
    onSubmit,
}) => {
    const [title, setTitle] = useState(article?.title || '');
    const [content, setContent] = useState(article?.content || '');
    const router = useRouter();

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
                background: '#23272b', // CARD_BG
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                padding: 32,
                maxWidth: 540,
                margin: '40px auto 0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                animation: 'fadeIn 0.7s',
                border: '1px solid #2e3237', // BORDER
                color: '#e6e6e6', // TEXT
            }}
        >
            <button
                type="button"
                onClick={() => router.back()}
                style={{
                    marginBottom: 10,
                    background: 'linear-gradient(90deg, #23272b 0%, #2e3237 100%)',
                    color: '#6abf4b',
                    border: `1.5px solid #6abf4b`,
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
                    transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.15s',
                    outline: 'none',
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                }}
            >
                <span style={{ fontSize: 18, lineHeight: 1, display: 'inline-block' }}>←</span>
                Назад
            </button>
            <div>
                <label htmlFor="title" style={{ fontWeight: 700, display: 'block', marginBottom: 6, color: '#e6e6e6', fontSize: 17 }}>
                    Заголовок
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 8,
                        border: '1px solid #2e3237',
                        fontSize: 16,
                        background: '#23272b',
                        color: '#e6e6e6',
                        transition: 'border 0.2s',
                        outline: 'none',
                    }}
                />
            </div>
            <div>
                <label htmlFor="content" style={{ fontWeight: 700, display: 'block', marginBottom: 6, color: '#e6e6e6', fontSize: 17 }}>
                    Содержание
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={8}
                    style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 8,
                        border: '1px solid #2e3237',
                        fontSize: 16,
                        background: '#23272b',
                        color: '#e6e6e6',
                        resize: 'vertical',
                        transition: 'border 0.2s',
                        outline: 'none',
                    }}
                />
            </div>
            <button
                type="submit"
                style={{
                    background: '#23272b',
                    color: '#e6e6e6',
                    border: '1.5px solid #6abf4b',
                    borderRadius: 8,
                    padding: '10px 22px',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
                    transition: 'background 0.2s, box-shadow 0.2s, color 0.2s, border 0.2s, transform 0.15s',
                    outline: 'none',
                    marginTop: 8,
                    alignSelf: 'stretch', // растягиваем на всю ширину
                }}
            >
                {article ? 'Сохранить' : 'Создать статью'}
            </button>
            <style jsx>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(30px);}
                  to { opacity: 1; transform: translateY(0);}
                }
            `}</style>
        </form>
    );
};

export default ArticleForm;