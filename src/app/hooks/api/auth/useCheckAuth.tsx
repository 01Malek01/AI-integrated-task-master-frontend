import axiosInstance from "@/app/lib/axios"
import { useQuery } from "@tanstack/react-query"

const useCheckAuth = () => { 
    const useCheckAuthReq = async () => {
      const res = await axiosInstance.get('/auth/checkAuth')
      return res.data
    }
    
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['checkAuth'],
        queryFn: useCheckAuthReq,
        retry: 0, // Don't retry failed requests
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    })
    
    return { 
        data, 
        isLoading: isLoading && !isError, // Don't show loading state if we got an error
        error,
        isError
    }
}

export default useCheckAuth
