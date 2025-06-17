import { NextResponse } from 'next/server';
import { ArticlesResponse } from '@/lib/types';

// Mock database (shared with the main articles route)
let articles: any[] = [];

export async function GET(request: Request) {
  // In a real app, you would get the user from the session
  const userId = '2'; // Mock user ID
  
  const userArticles = articles.filter(article => article.authorId === userId);
  
  return NextResponse.json<ArticlesResponse>({
    success: true,
    data: userArticles,
  });
}