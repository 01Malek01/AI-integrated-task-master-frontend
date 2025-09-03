import axiosInstance from "@/app/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { ResetPasswordData, ResetPasswordResponse } from '@/types/auth';

const useResetPassword = () => { 
    const useResetPasswordReq = async (data: ResetPasswordData) => {
      const { token, ...requestData } = data;
      const res = await axiosInstance.post(`/users/reset-password/${token}`, requestData);
      return res.data;
    };

    const { 
      mutateAsync: resetPassword, 
      isPending, 
      error, 
      isSuccess,
      isError 
    } = useMutation<ResetPasswordResponse, Error, ResetPasswordData>({
      mutationFn: useResetPasswordReq,
      mutationKey: ['resetPassword'],
    });

    return { 
      resetPassword, 
      isPending, 
      error: error as Error | null,
      isSuccess, 
      isError 
    };
}

export default useResetPassword;