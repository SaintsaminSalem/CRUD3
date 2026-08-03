import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

// Tracks which socket ids belong to which user, in case a user has multiple tabs open
const userSockets = new Map(); // userId -> Set of socket ids

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Authenticate every socket connection using the same JWT as your REST API
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // { id, role }
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const { id, role } = socket.user;

    console.log(`Socket connected: user ${id} (${role})`);

    // Join personal room so we can target this exact user
    socket.join(`user:${id}`);

    // Track this socket for the user (supports multiple tabs/devices)
    if (!userSockets.has(id)) {
      userSockets.set(id, new Set());
    }
    userSockets.get(id).add(socket.id);

    // Admins also join a shared "admins" room
    if (role === "admin") {
      socket.join("admins");
    }

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: user ${id}`);
      userSockets.get(id)?.delete(socket.id);
      if (userSockets.get(id)?.size === 0) {
        userSockets.delete(id);
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

// Helper: check if a user currently has an active connection
export const isUserOnline = (userId) => userSockets.has(String(userId));