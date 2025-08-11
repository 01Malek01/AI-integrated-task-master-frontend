import axiosInstance from "@/app/lib/axios"
import { useMutation  } from "@tanstack/react-query"

const useLogin = () => { 
    const useLoginReq = async ({ email, password }: { email: string; password: string }) => {
      const res = await axiosInstance.post('/auth/login', { email, password });
      return res.data;
    };

    const { 
      mutateAsync: login, 
      isPending, 
      error, 
      isSuccess,
      isError 
    } = useMutation({
      mutationFn: useLoginReq,
      mutationKey: ['login'],
    });

    return { 
      login, 
      isPending, 
      error: error as Error | null,
      isSuccess, 
      isError 
    };
}

export default useLogin
