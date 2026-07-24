import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  markAsRead,
} from "../controller/notificationController.js";

const router = express.Router();

router.get("/mine", protect, getMyNotifications);
router.put("/read/:id", protect, markAsRead);

export default router;