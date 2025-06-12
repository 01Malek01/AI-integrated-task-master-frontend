'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/auth-provider';

export function withAuthRedirect<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string; requireGuest?: boolean } = {}
) {
  const { redirectTo = '/', requireGuest = true } = options;

  const ComponentWithAuth = (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && isAuthenticated && requireGuest) {
        router.push(redirectTo);
      }
    }, [isAuthenticated, isLoading, router, redirectTo, requireGuest]);

    if (isLoading || (isAuthenticated && requireGuest)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
