import axiosInstance from "@/app/lib/axios"
import { useMutation } from "@tanstack/react-query"

const useRegister = () => { 
    const useRegisterReq = async ({ username, email, password }: { username: string; email: string; password: string }) => {
      try {
        const res = await axiosInstance.post('/auth/register'   , {
          username,
          email,
          password
        }
         )
        return res.data
      } catch (err) {
         console.error(err)
         throw err
      }
    }
const { mutateAsync: register, isPending, error } = useMutation({
    mutationFn: useRegisterReq,
    mutationKey : ['register'],
})
    return { register, isPending, error }
}

export default useRegister