import { NextResponse } from 'next/server';
import { Article, ArticlesResponse, ArticleResponse, DeleteArticleResponse } from '@/lib/types';
import { bot } from '@/bot/bot.init';

// Mock database
let articles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript',
    content: 'TypeScript is a typed superset of JavaScript...',
    authorId: '1',
    authorName: 'Admin User',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    tags: ['typescript', 'programming'],
  },
  {
    id: '2',
    title: 'React Best Practices',
    content: 'Here are some best practices when working with React...',
    authorId: '2',
    authorName: 'Regular User',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
    tags: ['react', 'frontend'],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (query) {
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) || 
      article.content.toLowerCase().includes(query.toLowerCase()) ||
      article.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    return NextResponse.json<ArticlesResponse>({
      success: true,
      data: filtered,
    });
  }
  
  return NextResponse.json<ArticlesResponse>({
    success: true,
    data: articles,
  });
}

export async function POST(request: Request) {
  const { title, content, tags } = await request.json();
  
  // In a real app, you would get the user from the session
  const user = { id: '2', name: 'Regular User' };
  
  const newArticle: Article = {
    id: (articles.length + 1).toString(),
    title,
    content,
    authorId: user.id,
    authorName: user.name,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags,
  };
  
  articles.unshift(newArticle);

  // Send notification to Telegram bot subscribers
  if (bot) {
    try {
      await bot.notifyNewArticle({
        title: newArticle.title,
        createdAt: newArticle.createdAt,
        url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/article/${newArticle.id}`
      });
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
  }
  
  return NextResponse.json<ArticleResponse>({
    success: true,
    data: newArticle,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json<DeleteArticleResponse>({
      success: false,
      error: 'Article ID is required',
    }, { status: 400 });
  }
  
  const articleIndex = articles.findIndex(article => article.id === id);
  
  if (articleIndex === -1) {
    return NextResponse.json<DeleteArticleResponse>({
      success: false,
      error: 'Article not found',
    }, { status: 404 });
  }
  
  articles.splice(articleIndex, 1);
  
  return NextResponse.json<DeleteArticleResponse>({
    success: true,
    data: { id },
  });
}