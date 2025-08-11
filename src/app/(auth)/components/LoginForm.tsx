'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from 'react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  }); 
  
  const router = useRouter();
  const { login, loginIsPending, loginError, loginIsSuccess, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsSubmitting(true);
      await login(data);
    } catch (error: any) {
      console.error('Login error:', error.response?.data?.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (loginError) {
      toast.error(loginError.response?.data?.message || 'Login failed. Please try again.');
    }
    
    if (loginIsSuccess && user) {
      toast.success('Logged in successfully!');
      router.push('/');
    }

    return () => {
      toast.dismiss();
    };
  }, [loginError, loginIsSuccess, user, router]);

  // Reset form when component mounts or when user logs out
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="w-full card p-8">
      <h2 className="text-[var(--color-text)] text-2xl font-bold text-center mb-8">
        Welcome Back
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            {...register("email")}
            disabled={loginIsPending || isSubmitting}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:opacity-50"
          />
          { errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            {...register("password")}
            disabled={loginIsPending || isSubmitting}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:opacity-50"
          />
          { errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={loginIsPending || isSubmitting}
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
          
          
        </div>

        <div>
          <button
            type="submit"
            disabled={loginIsPending || isSubmitting}
            className="cursor-pointer flex w-full justify-center items-center space-x-2 rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed h-10"
          >
            {(loginIsPending || isSubmitting) && <LoadingSpinner size={14} color="#ffffff" />}
            <span>{(loginIsPending || isSubmitting) ? 'Signing in...' : 'Sign in'}</span>
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