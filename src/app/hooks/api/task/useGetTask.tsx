import axiosInstance from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";

 

const useGetTask = ( id: string ) => {
    const getTaskReq =  async () => {
        const res = await axiosInstance.get(`/tasks/${id}`)
        return res.data
    }
       const { data, isLoading, error } = useQuery ({
        queryFn: getTaskReq,
        queryKey : ['getTask', id],
    })
    return { data, isLoading, error } 
}  
export default useGetTask