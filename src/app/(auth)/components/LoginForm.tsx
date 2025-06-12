'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();
  const { login, loginIsPending, loginError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      if(loginError){
        toast.error(loginError.message);
      } else {
        toast.success('Logged in successfully!');
      }
      // router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      // Error message will be shown from the auth provider's error state
       console.error('Login error:', error);
    }
  };

  return (
    <div className="w-full card p-8">
      <h2 className="text-[var(--color-text)] text-2xl font-bold text-center mb-8">
        Welcome Back
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loginIsPending}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={loginIsPending}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:opacity-50"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={loginIsPending}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>
          
          {loginError && (
            <div className="text-sm text-red-600 mt-2">
              {loginError.message || 'Invalid email or password'}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loginIsPending}
            className="flex w-full justify-center items-center space-x-2 rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed h-10"
          >
            {loginIsPending && <LoadingSpinner size={14} color="#ffffff" />}
            <span>{loginIsPending ? 'Signing in...' : 'Sign in'}</span>
          </button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-sm text-[var(--color-text-light)]">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] underline">
          Register Now
        </Link>
      </p>
    </div>
  )
}