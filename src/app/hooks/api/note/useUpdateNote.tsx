import axiosInstance from "@/app/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateNoteInput, NoteResponse } from "../../../../../types";

const useUpdateNote = () => {
    const queryClient = useQueryClient();

    const updateNoteReq = async (noteData: UpdateNoteInput): Promise<NoteResponse> => {
        const { _id, ...data } = noteData;
        const res = await axiosInstance.put(`/notes/${_id}`, data);
        return res.data;
    };

    const { mutate: updateNote, isPending, error } = useMutation<NoteResponse, Error, UpdateNoteInput>({
        mutationFn: updateNoteReq,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });
        },
    });

    return { updateNote, isPending, error };
};

export default useUpdateNote;
