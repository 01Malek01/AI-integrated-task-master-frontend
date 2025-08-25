import axiosInstance from "@/app/lib/axios"
import { useQuery } from "@tanstack/react-query"

 
 const useGetNotifications = () => {
    
const getNotifications = async () => {
    const res = await axiosInstance.get('/notifications')
    return res.data
}
    const {data, isLoading, error , refetch} = useQuery ({
        queryKey : ['notifications'],
        queryFn : getNotifications
    })
    return {data, isLoading, error, refetch}

}
 
 export default useGetNotifications