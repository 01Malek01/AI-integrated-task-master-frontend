import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

 

 const useUpdateSubtaskStatus = () => {
    const updateSubtaskStatusReq =  async ({status , id , subtaskId }: {
        status: string;
        id: string; 
        subtaskId: string;
    }) => {
        const res = await axiosInstance.patch(`/tasks/${id}/subtasks/${subtaskId}/status`, {
            status     
        }
         )
        return res.data
    }
       const { mutateAsync: updateSubtaskStatus, isPending, error } = useMutation ({
        mutationFn: updateSubtaskStatusReq,
        mutationKey : ['updateSubtaskStatus'],
    })
    return { updateSubtaskStatus   , isPending, error }
}  
export default useUpdateSubtaskStatus