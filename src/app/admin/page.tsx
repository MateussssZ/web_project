'use client';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="dashboard">
      <h2>Welcome to Admin Dashboard</h2>
      <div className="quick-actions">
        <Link href="/admin/articles/create" className="action-button">
          Create New Article
        </Link>
      </div>
      {/* ... статистика ... */}
    </div>
  );
}