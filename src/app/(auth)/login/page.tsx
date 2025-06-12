'use client';
import React from 'react'
import LoginForm from '../components/LoginForm'
import { redirect } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

export default function Login() {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return redirect('/');
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <LoginForm />
      </div>
    </div>
  )
}
