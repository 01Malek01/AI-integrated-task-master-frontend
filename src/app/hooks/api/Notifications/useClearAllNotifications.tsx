import axiosInstance from "@/app/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useClearAllNotifications = () => {
  const queryClient = useQueryClient()
  
  const clearAllNotifications = async () => {
    const res = await axiosInstance.delete('/notifications')
    return res.data
  }

  return useMutation({
    mutationFn: clearAllNotifications,
    onSuccess: () => {
      // Invalidate and refetch notifications after clearing all
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export default useClearAllNotifications
