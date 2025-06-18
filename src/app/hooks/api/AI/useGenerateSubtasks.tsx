 
import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { NoteResponse } from "../../../../../types";

interface GenerateSubtasksVariables {
  title: string;
  taskId: string;
}

const useGenerateSubtasks = () => {
    const generateSubtasksReq = async ({ title, taskId }: GenerateSubtasksVariables): Promise<NoteResponse> => {
        const res = await axiosInstance.post('/ai/generate-subtasks', { title, taskId });
        return res.data;
    };

    const { mutateAsync: generateSubtasks, isPending, error } = useMutation<NoteResponse, Error, GenerateSubtasksVariables>({
        mutationFn: generateSubtasksReq,
    });

    return { generateSubtasks, isPending, error };
};

export default useGenerateSubtasks;
