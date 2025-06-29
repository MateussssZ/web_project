import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import '@/bot/bot.init';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Article Platform',
  description: 'A platform for publishing and reading articles',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}