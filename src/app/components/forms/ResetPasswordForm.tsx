'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useResetPassword from '@/app/hooks/api/auth/useResetPassword';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const { resetPassword, isPending, isSuccess, isError,error } = useResetPassword();
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    if (isSuccess) {
      router.push('/login');
    }
    if (isError) {
      //@ts-ignore
      toast.error(error?.response?.data?.message || 'Failed to reset password. Please try again.');
    }

  }, [token, router]);
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { register, formState: { errors }, handleSubmit } = form;

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      
      toast.success('Password reset successfully!');
      router.push('/login');
    } catch (error: any) {
      console.error('Password reset failed:', error);
      toast.error(error?.response?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 card shadow-lg h-96 w-96 flex-col flex justify-between items-center" noValidate>
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Reset Your Password</h2>
      
      <div>
        <label htmlFor="newPassword" className="form-label">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          className={`form-input ${errors.newPassword ? 'border-red-500' : ''}`}
          disabled={isPending}
          {...register('newPassword')}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="form-label">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
          disabled={isPending}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex items-center gap-2 p-3 rounded"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Resetting...
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </div>
    </form>
  );
}