'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import useGetNotifications from '@/app/hooks/api/Notifications/useGetNotification';
 import {io} from 'socket.io-client';
import { useAuth } from './auth-provider';
type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  createdAt: string;
  action?: {
    label: string;
    url: string;
  };
};

type NotificationsContextType = {
  notifications: NotificationType[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export default function NotificationsProvider({ children }: { children: ReactNode }) {
  const { data: fetchedNotifications = [], isLoading, error, refetch } = useGetNotifications();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user,isAuthenticated } = useAuth();

  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications);
    }
  }, [fetchedNotifications]);

  useEffect(() => {
    // Create socket connection
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000", {
      withCredentials: true,
    });

    // Only join if user is available
    if (user?._id && isAuthenticated) {
      socket.emit("join", user._id);
      console.log("Joining room:", user._id);
    }

    // Listen for notifications
    const handleNotification = (data: NotificationType) => {
      setNotifications((prev) => [...prev, data]);
      console.log("Received notification:", data);
    };

    socket.on("notification", handleNotification);
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      if (user?._id && isAuthenticated) {
        socket.emit("join", user._id);
      }
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up socket connection");
      socket.off("notification", handleNotification);
      socket.off("connect");
      socket.close();
    };
  }, [user?._id , isAuthenticated]);

  // Calculate unread count
  const unreadCount = notifications.filter((n: NotificationType) => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}