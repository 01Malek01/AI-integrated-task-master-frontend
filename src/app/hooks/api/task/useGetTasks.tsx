import axiosInstance from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";

 

const useGetTasks = () => {
    const getTasksReq =  async () => {
        const res = await axiosInstance.get('/tasks')
        return res.data
    }
       const { data, isLoading, error,refetch } = useQuery ({
        queryFn: getTasksReq,
        queryKey : ['getTasks'],
    })
    return { data, isLoading, error,refetch } 
}  
export default useGetTasks