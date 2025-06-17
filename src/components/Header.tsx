import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';

export const Header: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Article Platform
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          
          {user && (
            <>
              <Link href="/create" className="hover:text-blue-600">
                Create Article
              </Link>
              <Link href="/my-articles" className="hover:text-blue-600">
                My Articles
              </Link>
            </>
          )}
          
          {user?.role === 'admin' && (
            <Link href="/admin" className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md hover:bg-yellow-200">
              Admin Panel
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <span className="text-sm text-gray-600">Hello, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};