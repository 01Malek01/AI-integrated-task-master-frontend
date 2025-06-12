'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

interface UseProtectedRouteOptions {
  redirectTo?: string;
  requireAdmin?: boolean;
  onUnauthenticated?: () => void;
  onUnauthorized?: () => void;
}

export function useProtectedRoute({
  redirectTo = '/login',
  requireAdmin = false,
  onUnauthenticated,
  onUnauthorized,
}: UseProtectedRouteOptions = {}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      onUnauthenticated?.();
      router.push(redirectTo);
      return;
    }

    if (requireAdmin && !user.isAdmin) {
      onUnauthorized?.();
      router.push('/unauthorized');
    }
  }, [user, isInitialized, requireAdmin, router, redirectTo, onUnauthenticated, onUnauthorized]);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isLoading: !isInitialized,
  };
}
