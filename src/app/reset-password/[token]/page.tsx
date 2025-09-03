'use client';

import { useParams } from 'next/navigation';
import ResetPasswordForm from '@/app/components/forms/ResetPasswordForm';

export default function page() {
  const params = useParams();

  const token = params.token;

  if (!token) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center mb-4">Invalid Reset Link</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            The reset link is invalid or has expired. Please request a new password reset.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="text-center mb-8">
         
        </div>
        <ResetPasswordForm token={token as string} />
      </div>
  );
}