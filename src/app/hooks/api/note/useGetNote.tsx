import axiosInstance from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { NoteResponse } from "../../../../../types";

const useGetNote = (noteId: string) => {
    const getNoteReq = async (): Promise<NoteResponse> => {
        const res = await axiosInstance.get(`/notes/${noteId}`);
        return res.data;
    };

    const { data, isLoading, error, refetch } = useQuery<NoteResponse, Error>({
        queryKey: ['getNote', noteId],
        queryFn: getNoteReq,
        enabled: !!noteId,
    });

    return { data, isLoading, error, refetch };
};

export default useGetNote;
