import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

 

 const useUpdateTaskStatus = () => {
    const updateTaskStatusReq =  async ({status , id }: {
        status: string;
        id: string; 
    }) => {
        const res = await axiosInstance.put(`/tasks/${id}/status`, {
            status     
        }
         )
        return res.data
    }
       const { mutateAsync: updateTaskStatus, isPending, error } = useMutation ({
        mutationFn: updateTaskStatusReq,
        mutationKey : ['updateTaskStatus'],
    })
    return { updateTaskStatus   , isPending, error }
}  
export default useUpdateTaskStatus