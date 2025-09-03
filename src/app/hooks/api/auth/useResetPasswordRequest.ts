import axiosInstance from "@/app/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { ResetPasswordRequestData, ResetPasswordResponse } from '@/types/auth';

const useResetPasswordRequest = () => { 
    const useResetPasswordRequestReq = async (data: ResetPasswordRequestData) => {
      const res = await axiosInstance.post('/users/reset-password',{
          email:data.email
      });
      return res.data;
    };

    const { 
      mutateAsync: resetPasswordRequest, 
      isPending, 
      error, 
      isSuccess,
      isError 
    } = useMutation<ResetPasswordResponse, Error, ResetPasswordRequestData>({
      mutationFn: useResetPasswordRequestReq,
      mutationKey: ['resetPasswordRequest'],
    });

    return { 
      resetPasswordRequest, 
      isPending, 
      error: error as Error | null,
      isSuccess, 
      isError 
    };
}

export default useResetPasswordRequest;