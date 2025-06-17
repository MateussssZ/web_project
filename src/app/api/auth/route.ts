import { NextResponse } from 'next/server';
import { AuthResponse } from '@/lib/types';

// Mock database
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In real app, store hashed passwords
    role: 'admin',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date('2023-01-15'),
  },
];

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (pathname.endsWith('/login')) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Invalid credentials',
      }, { status: 401 });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json<AuthResponse>({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token',
    });
  }
  
  if (pathname.endsWith('/register')) {
    if (users.some(u => u.email === email)) {
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Email already in use',
      }, { status: 400 });
    }
    
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password, // In real app, hash the password
      role: 'user',
      createdAt: new Date(),
    };
    
    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json<AuthResponse>({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token',
    });
  }
  
  if (pathname.endsWith('/logout')) {
    // In real app, invalidate the session/token
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ success: false, error: 'Invalid endpoint' }, { status: 404 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  
  if (url.pathname.endsWith('/me')) {
    // In real app, verify the session/token and get the user
    // For mock purposes, return the first user
    const user = users[1]; // Return regular user for mock
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  }
  
  return NextResponse.json({ success: false, error: 'Invalid endpoint' }, { status: 404 });
}