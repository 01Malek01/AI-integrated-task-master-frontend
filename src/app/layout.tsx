import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';
 
export const metadata: Metadata = {
  title: 'Task Master',
  description: 'Manage your tasks efficiently',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};  

const workSans = Work_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
