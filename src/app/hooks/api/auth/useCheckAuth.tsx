import axiosInstance from "@/app/lib/axios"
import { useQuery } from "@tanstack/react-query"

const useCheckAuth = () => { 
    const useCheckAuthReq = async () => {
      try {
        const res = await axiosInstance.get('/auth/checkAuth')
        return res.data
      } catch (err) {
         console.error(err)
      }
    }
const { data, isLoading, error } = useQuery({
    queryKey: ['checkAuth'],
    queryFn: useCheckAuthReq,
})
    return { data, isLoading, error }
}

export default useCheckAuth
