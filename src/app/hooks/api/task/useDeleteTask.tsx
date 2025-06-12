import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

 

const useDeleteTask = () => {
    const deleteTaskReq =  async ({id}: {
        id: string;
    }) => {
        const res = await axiosInstance.delete(`/tasks/${id}`)
        return res.data
    }
       const { mutateAsync: deleteTask, isPending, error } = useMutation ({
        mutationFn: deleteTaskReq,
        mutationKey : ['deleteTask'],
    })
    return { deleteTask, isPending, error }
}  
export default useDeleteTask 