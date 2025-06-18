import { useQuery } from '@tanstack/react-query';
import axiosInstance from "@/app/lib/axios";
import { ApiError } from 'next/dist/server/api-utils';
 
interface NotesCountResponse {
  count: number;
}

const fetchNotesCount = async (): Promise<NotesCountResponse> => {
  try {
    const { data } = await axiosInstance.get('/notes/stats/count');
    return data;
  } catch (error) {
    throw new Error(
      error instanceof ApiError ? error.message : 'Failed to fetch notes count'
    );
  }
};

export const useNotesCount = () => {
  return useQuery<NotesCountResponse, Error>({
    queryKey: ['notesCount'],
    queryFn: fetchNotesCount,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
 