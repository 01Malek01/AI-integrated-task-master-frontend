import axiosInstance from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../../../../../types";

const useGetNotes = () => {
    const getNotesReq = async (): Promise<Note[]> => {
        const res = await axiosInstance.get('/notes');
        return res.data;
    };

    const { data, isLoading, error, refetch } = useQuery<Note[], Error>({
        queryKey: ['getNotes'],
        queryFn: getNotesReq,
    });

    return { data, isLoading, error, refetch };
};

export default useGetNotes;
