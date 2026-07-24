import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null, // null = broadcast to admins, not a specific user
    },
    audience: {
      type: String,
      enum: ["user", "admins"],
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g. "user_created", "user_updated", "user_deleted"
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notifications", notificationSchema);