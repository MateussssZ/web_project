export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface ArticlesResponse extends ApiResponse<Article[]> {}
export interface ArticleResponse extends ApiResponse<Article> {}
export interface DeleteArticleResponse extends ApiResponse<{ id: string }> {}
export interface AuthResponse extends ApiResponse<{
  user: User;
  token: string;
}> {}

export interface ArticleCreatedEvent {
  id: string;
  title: string;
  authorName: string;
  createdAt: Date;
  url: string;
}