import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User, AuthResponse } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  return (
    <AuthContext.Provider value=>{{
      user,
      isLoading,
      login: async (email: string, password: string) => {
        try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      
      const data: AuthResponse = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        router.push('/');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
      },
      logout: async () => {
        try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
      },
      register: async (name: string, email: string, password: string) => {
        try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });
      
      const data: AuthResponse = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        router.push('/');
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};
  
export const useAuth = () => useContext(AuthContext);