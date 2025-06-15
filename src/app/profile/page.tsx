'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import ProfilePage from '../(auth)/components/Profile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, isInitialized, router]);

  if (isAuthLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={14} color="var(--color-primary)" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <ProfilePage />
    </div>
  );
}
