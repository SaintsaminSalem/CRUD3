import { useEffect, useState, useCallback } from "react";
import { connectSocket } from "../socket";
import { getMyNotifications, markNotificationRead } from "../api/notificationApi";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load notification history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getMyNotifications();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  // Connect socket and listen for live notifications
  useEffect(() => {
    const socket = connectSocket();

    if (!socket) return;

    const handleNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  const markAsRead = useCallback(async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    await markNotificationRead(id);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, loading, unreadCount, markAsRead };
}
