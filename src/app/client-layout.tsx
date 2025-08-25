'use client';

import { Work_Sans } from 'next/font/google';
import Header from './components/Header';
import QueryProvider from '../providers/query-provider';
import ToastProvider from '../providers/toast-provider';
import AuthProvider from '@/providers/auth-provider';
import {onCLS,onINP,onLCP} from "web-vitals"
import { useEffect } from 'react';
import NotificationsProvider from '@/providers/notificationsProvider';
  const workSans = Work_Sans({ subsets: ['latin'] });

export default function  ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//  useEffect(()=>{
//   onCLS(console.log, { reportAllChanges: true } );  
//   onINP(console.log, { reportAllChanges: true } );
//   onLCP(console.log, { reportAllChanges: true } );
//  },[])
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${workSans.className} h-full`}>
        <QueryProvider>
            <AuthProvider>  
          <ToastProvider />
          <NotificationsProvider> 
          <nav className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200'>
            <Header />
          </nav>
          <main className='h-full pt-16'>
            {children}
          </main>
          </NotificationsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
