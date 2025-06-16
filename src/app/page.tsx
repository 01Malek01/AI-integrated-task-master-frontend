'use client'
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/providers/auth-provider'
import React from 'react'
import Landing from './components/Landing';
import Home from './components/Home';

export default function page() {
  const {isAuthenticated , isInitialized , isLoading} = useAuth();

  if (!isInitialized) {
    return (
      <LoadingSpinner size={14} color="var(--color-primary)" />
    )
    }
    if (isLoading) {
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
