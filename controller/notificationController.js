import Notification from "../model/notificationModel.js";
import { getIO } from "../socket/socketServer.js";

// Save to DB + emit in real time, in one call
export const notifyUser = async (userId, type, message) => {
  const notification = await Notification.create({
    recipient: userId,
    audience: "user",
    type,
    message,
  });

  getIO().to(`user:${userId}`).emit("notification", notification);

  return notification;
};

export const notifyAdmins = async (type, message) => {
  const notification = await Notification.create({
    recipient: null,
    audience: "admins",
    type,
    message,
  });

  getIO().to("admins").emit("notification", notification);

  return notification;
};

// Fetch notifications for the logged-in user (used to load history on page load)
export const getMyNotifications = async (req, res) => {
  try {
    const { id, role } = req.user;

    const query =
      role === "admin"
        ? { $or: [{ recipient: id }, { audience: "admins" }] }
        : { recipient: id };

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};