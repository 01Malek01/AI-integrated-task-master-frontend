import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

 

 const useCreateTask = () => {
    const createTaskReq =  async ({title , dueDate , description , priority , status , category }: {
        title: string;
        dueDate: string;
        description: string;
        priority: string;
        status: string;
        category?: string;
    }) => {
        const res = await axiosInstance.post('/tasks', {
            title,
            dueDate,
            description,
            priority,
            status,
            category     
        }
         )
        return res.data
    }
       const { mutateAsync: createTask, isPending, error } = useMutation ({
        mutationFn: createTaskReq,
        mutationKey : ['createTask'],
    })
    return { createTask, isPending, error }
}  
export default useCreateTask