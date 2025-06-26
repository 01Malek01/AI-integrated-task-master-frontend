import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

 

 const useUpdateTask = () => {
    const updateTaskReq =  async ({title , dueDate , description , priority , status , category , id,startDate }: {
        title?: string;
        dueDate?: string;
        description?: string;
        priority?: string;
        status?: string;
        category?: string;
        id: string;
        startDate?: string;
    }) => {
        const res = await axiosInstance.put(`/tasks/${id}`, {
            title,
            dueDate,
            description,
            priority,
            status,
            category,
            startDate     
        }
         )
        return res.data
    }
       const { mutateAsync: updateTask, isPending, error } = useMutation ({
        mutationFn: updateTaskReq,
        mutationKey : ['updateTask'],
    })
    return { updateTask, isPending, error }
}  
export default useUpdateTask