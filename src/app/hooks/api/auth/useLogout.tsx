import axiosInstance from "@/app/lib/axios"
import { useMutation  } from "@tanstack/react-query"

const useLogout = () => { 
    const useLogoutReq = async () => {
      try {
        const res = await axiosInstance.post('/auth/logout')
        return res.data
      } catch (err) {
         console.error(err)
      }
    }
const { mutateAsync: logout, isPending, error } = useMutation({
    mutationFn: useLogoutReq,
    mutationKey : ['logout'],
})
    return { logout, isPending, error }
}

export default useLogout
