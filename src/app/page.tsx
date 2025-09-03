'use client'
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/providers/auth-provider'
import React, { Suspense } from 'react'
import Landing from './components/Landing';
import Home from './components/Home';





function AuthCheck(){
  const {isAuthenticated , isInitialized , isLoading} = useAuth();

  if (!isInitialized || isLoading) {
    return (
      <LoadingSpinner size={14} color="var(--color-primary)" />
    )
    }
    if (!isAuthenticated) {
      return <Landing />
    }
     if (isAuthenticated) {
      return (
        <Home />
      )
    }
}

export default function Page(){
  return (
    <Suspense fallback={<LoadingSpinner size={14} color="var(--color-primary)" />}>
    <AuthCheck />
   </Suspense>
  )
}