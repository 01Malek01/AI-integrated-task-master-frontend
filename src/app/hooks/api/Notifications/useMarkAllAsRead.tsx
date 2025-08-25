import axiosInstance from "@/app/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()
  
  const markAllAsRead = async () => {
    const res = await axiosInstance.patch('/notifications/read')
    return res.data
  }

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      // Invalidate and refetch notifications after marking all as read
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export default useMarkAllAsRead
