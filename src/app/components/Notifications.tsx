import { X, Check } from 'lucide-react'
import React from 'react'
import { Notifications as NotificationsType } from '../../../types'
import { useNotifications } from '@/providers/notificationsProvider'
import useMarkAllAsRead from '@/app/hooks/api/Notifications/useMarkAllAsRead'
import useClearAllNotifications from '@/app/hooks/api/Notifications/useClearAllNotifications'

export default function Notifications(
  
) {
  const { notifications, isLoading, refetch, error, unreadCount } = useNotifications();
  const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } = useMarkAllAsRead();
  const { mutate: clearAll, isPending: isClearing } = useClearAllNotifications();
  return (
    <div className="absolute top-17 right-0 z-50 w-80 max-h-96 overflow-hidden bg-white rounded-lg shadow-xl border border-gray-200">
    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0">
      <div className="flex items-center flex-col text-center justify-center mx-auto  ">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        {unreadCount > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => markAllAsRead()} 
            disabled={isMarkingAllAsRead || unreadCount === 0}
            className="cursor-pointer inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4 mr-1" />
            {isMarkingAllAsRead ? 'Marking...' : 'Mark all as read'}
          </button>
          <span className="text-gray-300">|</span>
          <button 
            onClick={() => clearAll()}
            disabled={isClearing || notifications.length === 0}
            className="cursor-pointer inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4 mr-1" />
            {isClearing ? 'Clearing...' : 'Clear all'}
          </button>
        </div>
      </div>
    </div>
    <div className="overflow-y-auto max-h-80">
      {notifications.length > 0 ? notifications.reverse().map((notification, index) => (
        <div
          key={notification.id || index}
          className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
            !notification.read ? 'cursor-pointer bg-blue-50 hover:bg-blue-100' : 'cursor-default'
          }`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 font-medium">
              {notification.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {notification.message}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(notification?.createdAt).toLocaleTimeString()}
            </p>
          </div>
          {!notification.read && (
            <div className="flex-shrink-0 ml-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          )}
        </div>
      )) : (
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm">No notifications yet</p>
          <p className="text-gray-400 text-xs mt-1">
            We'll notify you when something arrives
          </p>
        </div>
      )}
    </div>
  </div>
)
}
  
