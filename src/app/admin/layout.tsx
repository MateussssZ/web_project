// src/app/admin/layout.tsx
'use client'; // Добавляем для использования хуков и стилей

import { useRouter } from 'next/navigation';
import './globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav>
          <button onClick={() => router.push('/admin')}>Dashboard</button>
          <button onClick={() => router.push('/admin/articles')}>Articles</button>
        </nav>
      </header>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}