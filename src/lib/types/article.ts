export interface Article {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
    status: 'draft' | 'published' | 'archived';
    tags: string[];
    imageUrl?: string;
    excerpt?: string;
  }
  
  export type ArticleCreatePayload = Omit<
    Article,
    'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'authorId' | 'authorName'
  > & {
    authorId?: string;
    authorName?: string;
  };
  
  export type ArticleUpdatePayload = Partial<ArticleCreatePayload>;
  
  export interface ArticlesResponse {
    data: Article[];
    total: number;
    page: number;
    limit: number;
  }
  
  export interface ArticlesFilter {
    status?: 'draft' | 'published' | 'archived';
    authorId?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'title';
    sortOrder?: 'asc' | 'desc';
  }