 
import axiosInstance from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { NoteResponse } from "../../../../../types";

const useGenerateDesc = () => {

    const generateDescReq = async (title: string): Promise<NoteResponse> => {
        const res = await axiosInstance.post('/ai/generate-description', {title});
        return res.data;
    };

    const { mutateAsync: generateDesc, isPending, error  } = useMutation<NoteResponse, Error, string>({
        mutationFn: generateDescReq,
       
    });

    return { generateDesc, isPending, error };
};

export default useGenerateDesc;
