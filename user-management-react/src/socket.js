import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

let socket = null;

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  // Avoid creating duplicate connections
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"], // allow fallback if websocket upgrade fails
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};