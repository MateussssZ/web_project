import { Article, ArticlesResponse, ArticlesFilter, ArticleCreatePayload, ArticleUpdatePayload } from '../types/article';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export class ArticlesApiClient {
  private static instance: ArticlesApiClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/admin/articles`;
  }

  public static getInstance(): ArticlesApiClient {
    if (!ArticlesApiClient.instance) {
      ArticlesApiClient.instance = new ArticlesApiClient();
    }
    return ArticlesApiClient.instance;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  }

  async getArticles(filter: ArticlesFilter = {}): Promise<ArticlesResponse> {
    const params = new URLSearchParams();
    
    if (filter.status) params.append('status', filter.status);
    if (filter.authorId) params.append('authorId', filter.authorId);
    if (filter.search) params.append('search', filter.search);
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.limit) params.append('limit', filter.limit.toString());
    if (filter.sortBy) params.append('sortBy', filter.sortBy);
    if (filter.sortOrder) params.append('sortOrder', filter.sortOrder);

    const url = `${this.baseUrl}?${params.toString()}`;
    return this.request<ArticlesResponse>(url, { method: 'GET' });
  }

  async getArticleById(id: string): Promise<Article> {
    const url = `${this.baseUrl}/${id}`;
    return this.request<Article>(url, { method: 'GET' });
  }

  async createArticle(payload: ArticleCreatePayload): Promise<Article> {
    return this.request<Article>(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async updateArticle(id: string, payload: ArticleUpdatePayload): Promise<Article> {
    const url = `${this.baseUrl}/${id}`;
    return this.request<Article>(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  async deleteArticle(id: string): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    await this.request<void>(url, { method: 'DELETE' });
  }

  async publishArticle(id: string): Promise<Article> {
    const url = `${this.baseUrl}/${id}/publish`;
    return this.request<Article>(url, { method: 'POST' });
  }

  async archiveArticle(id: string): Promise<Article> {
    const url = `${this.baseUrl}/${id}/archive`;
    return this.request<Article>(url, { method: 'POST' });
  }
}

export const articlesApiClient = ArticlesApiClient.getInstance();