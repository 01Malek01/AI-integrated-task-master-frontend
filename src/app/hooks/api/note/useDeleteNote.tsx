import axiosInstance from "@/app/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteNoteResponse {
    success: boolean;
    message: string;
}

const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const deleteNoteReq = async (noteId: string): Promise<DeleteNoteResponse> => {
        const res = await axiosInstance.delete(`/notes/${noteId}`);
        return res.data;
    };

    const { mutate: deleteNote, isPending, error } = useMutation<DeleteNoteResponse, Error, string>({
        mutationFn: deleteNoteReq,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });
        },
    });

    return { deleteNote, isPending, error };
};

export default useDeleteNote;
