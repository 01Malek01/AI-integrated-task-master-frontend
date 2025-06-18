import axiosInstance from '@/app/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';


interface CompletedTasksCountResponse {
  completed: number;
}

const fetchCompletedTasksCount = async (): Promise<CompletedTasksCountResponse> => {
  try {
    const { data } = await axiosInstance.get('/tasks/stats/completed');
    return data;
  } catch (error) {
    throw new Error(
      error instanceof ApiError ? error.message : 'Failed to fetch completed tasks count'
    );
  }
};

export const useCompletedTasksCount = () => {
  return useQuery<CompletedTasksCountResponse, Error>({
    queryKey: ['completedTasksCount'],
    queryFn: fetchCompletedTasksCount,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
