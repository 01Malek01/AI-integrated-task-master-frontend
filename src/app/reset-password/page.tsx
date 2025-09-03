'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import useResetPasswordRequest from '../hooks/api/auth/useResetPasswordRequest';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordRequestData } from '@/types/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { z } from 'zod';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const { resetPasswordRequest, isPending, isSuccess, isError, error } = useResetPasswordRequest();   

    const formSchema = z.object({
        email: z.string().email('Please enter a valid email address'),
    });

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<ResetPasswordRequestData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ResetPasswordRequestData) => {
        await resetPasswordRequest({ email: data.email });
    };

    if (isSuccess) {
        return (
            <div className="w-full h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-[var(--color-bg-light)] text-center">
                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                        Check Your Email
                    </h1>
                    <p className="text-[var(--color-text-light)] text-sm mb-8">
                        We've sent you an email with instructions to reset your password.
                    </p>
                    <Link 
                        href="/" 
                        className="     btn-primary text-center p-3 rounded inline-block"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                        Reset Password
                    </h1>
                    <p className="text-[var(--color-text-light)] text-sm">
                        Enter your email to receive a password reset link
                    </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email address"
                            required
                            {...register('email')}
                            disabled={isPending}
                            className={`w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
                        )}
                    </div>

                    {isError && (
                        <div className="p-3 text-sm rounded-lg bg-red-100 text-red-700">
                            {error?.message || 'Failed to send reset email. Please try again.'}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className=" cursor-pointer w-full flex items-center bg-[var(--color-primary)] justify-center gap-2 py-3 px-4 hover:bg-[var(--color-primary-dark)] text-[var(--color-text)] font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <span className='flex items-center gap-2 w-5 h-5 justify-center'>
                                <LoadingSpinner size={16} />
                            </span>
                        ) : 'Send Reset Link'}
                    </button>

                    <div className="text-center mt-4">
                        <Link 
                            href="/login" 
                            className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] hover:underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}