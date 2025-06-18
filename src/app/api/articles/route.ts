import { NextResponse } from 'next/server';

export async function GET() {
  // Логика получения статей
  return NextResponse.json([...]);
}

export async function POST(request: Request) {
  // Логика создания статьи
  return NextResponse.json({ success: true });
}