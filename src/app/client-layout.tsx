'use client';

import { Inter } from 'next/font/google';
import Header from './components/Header';
import QueryProvider from '../providers/query-provider';
import ToastProvider from '../providers/toast-provider';
import AuthProvider from '@/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <QueryProvider>
          <ToastProvider />
          <AuthProvider>

          <nav className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200'>
            <Header />
          </nav>
          <main className='h-full pt-16'>
            {children}
          </main>
          <footer>
            <p>© 2025 Tasks Master. All rights reserved.</p>
          </footer>
          </AuthProvider>

        </QueryProvider>
      </body>
    </html>
  );
}
