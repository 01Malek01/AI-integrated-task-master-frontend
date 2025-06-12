import axiosInstance from "@/app/lib/axios"
import { useMutation  } from "@tanstack/react-query"

const useLogin = () => { 
    const useLoginReq = async ( { email, password }: { email: string; password: string }) => {
      try {
        const res = await axiosInstance.post('/auth/login',
          {
            email,
            password
          }
        )
        return res.data
      } catch (err) {
         console.error(err)
      }
    }
const { mutateAsync: login, isPending, error } = useMutation({
    mutationFn: useLoginReq,
    mutationKey : ['login'],
})
    return { login, isPending, error }
}

export default useLogin
