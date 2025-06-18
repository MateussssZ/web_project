import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Разрешаем доступ к страницам логина и регистрации без проверки
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') // разрешаем статику Next.js
  ) {
    return NextResponse.next();
  }

  // Проверяем наличие куки 'user'
  const userCookie = request.cookies.get('user');
  if (!userCookie) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}