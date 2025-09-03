import axiosInstance from "@/app/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/providers/auth-provider"

 
 const useGetNotifications = () => {
    const {isAuthenticated} = useAuth()
const getNotifications = async () => {
    const res = await axiosInstance.get('/notifications')
    return res.data
}
    const {data, isLoading, error , refetch} = useQuery ({
        queryKey : ['notifications'],
        queryFn : getNotifications,
        enabled : isAuthenticated   
    })
    return {data, isLoading, error, refetch}

}
 
 export default useGetNotifications