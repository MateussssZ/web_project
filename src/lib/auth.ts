'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { User } from './types'

// 1. Определяем интерфейс для значения контекста
interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
}

// 2. Создаем контекст с явным указанием типа
const AuthContext = createContext<AuthContextValue | null>(null)

// 3. Создаем провайдер
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })

      const data = await response.json()
      if (response.ok && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Login failed')
      await fetchUser()
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [fetchUser, router])

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Registration failed')
      await fetchUser()
      router.push('/')
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [fetchUser, router])

  // 4. Создаем объект значения для провайдера
  let value = {
    user,
    isLoading,
    login,
    logout,
    register
  }

  return (
    // 5. Передаем значение в провайдер
    <AuthContext.Provider (value={value})>
      {children}
    </AuthContext.Provider>
  )
}

// 6. Создаем хук для использования контекста
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}