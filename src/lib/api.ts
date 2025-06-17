import { Article, ArticlesResponse, ArticleResponse, DeleteArticleResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Articles
  getArticles: async (): Promise<ArticlesResponse> => {
    return fetchApi<ArticlesResponse>('/articles');
  },

  getArticle: async (id: string): Promise<ArticleResponse> => {
    return fetchApi<ArticleResponse>(`/articles/${id}`);
  },

  createArticle: async (article: { title: string; content: string; tags?: string[] }): Promise<ArticleResponse> => {
    return fetchApi<ArticleResponse>('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  },

  deleteArticle: async (id: string): Promise<DeleteArticleResponse> => {
    return fetchApi<DeleteArticleResponse>(`/articles/${id}`, {
      method: 'DELETE',
    });
  },

  searchArticles: async (query: string): Promise<ArticlesResponse> => {
    return fetchApi<ArticlesResponse>(`/articles/search?q=${encodeURIComponent(query)}`);
  },

  getMyArticles: async (): Promise<ArticlesResponse> => {
    return fetchApi<ArticlesResponse>('/articles/me');
  },
};