import axiosInstance from "@/app/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNoteInput, NoteResponse } from "../../../../../types";

const useCreateNote = () => {
    const queryClient = useQueryClient();

    const createNoteReq = async (noteData: CreateNoteInput): Promise<NoteResponse> => {
        const res = await axiosInstance.post('/notes', noteData);
        return res.data;
    };

    const { mutate: createNote, isPending, error } = useMutation<NoteResponse, Error, CreateNoteInput>({
        mutationFn: createNoteReq,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });
        },
    });

    return { createNote, isPending, error };
};

export default useCreateNote;
