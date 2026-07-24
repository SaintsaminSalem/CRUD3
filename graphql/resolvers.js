import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import Notification from "../model/notificationModel.js";
import generateToken from "../utils/generateToken.js";
import { requireAuth, requireAdmin } from "./authContext.js";
import { notifyAdmins, notifyUser } from "../controller/notificationController.js";

const resolvers = {
  // ---------- Queries ----------

  users: async (args, context) => {
    requireAdmin(context);

    // Optimization: only pull the fields the User type actually exposes,
    // skip loading `password` at all instead of fetching then discarding it
    return User.find().select("name email address role createdAt");
  },

  user: async ({ id }, context) => {
    requireAuth(context);
    return User.findById(id).select("name email address role createdAt");
  },

  myNotifications: async (args, context) => {
    const { id, role } = requireAuth(context);

    const query =
      role === "admin"
        ? { $or: [{ recipient: id }, { audience: "admins" }] }
        : { recipient: id };

    return Notification.find(query).sort({ createdAt: -1 });
  },

  // ---------- Mutations ----------

  signup: async ({ name, email, address, password }) => {
    try {
      email = email.trim().toLowerCase();

      const userExist = await User.findOne({ email });
      if (userExist) {
        return { success: false, message: "User already exists" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const role = email === "admin@gmail.com" ? "admin" : "user";

      const user = await User.create({
        name,
        email,
        address,
        password: hashedPassword,
        role,
      });

      const token = generateToken(user._id, user.role);

      return {
        success: true,
        message: "Account created successfully",
        token,
        user,
      };
    } catch (error) {
      return { success: false, message: "Internal Server Error" };
    }
  },

  login: async ({ email, password }) => {
    try {
      email = email.trim().toLowerCase();

      const user = await User.findOne({ email });
      if (!user) {
        return { success: false, message: "User not found" };
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return { success: false, message: "Invalid email or password" };
      }

      const token = generateToken(user._id, user.role);

      return {
        success: true,
        message: "Login successful",
        token,
        user,
      };
    } catch (error) {
      return { success: false, message: "Internal Server Error" };
    }
  },

  createUser: async ({ name, email, address, password }, context) => {
    requireAdmin(context);

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
    });

    await notifyAdmins("user_created", `New user "${savedUser.name}" was added`);

    return savedUser;
  },

  updateUser: async ({ id, ...updates }, context) => {
    requireAdmin(context);

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    await notifyAdmins("user_updated", `User "${updatedUser.name}" was updated`);
    await notifyUser(id, "profile_updated", "Your profile information was updated");

    return updatedUser;
  },

  deleteUser: async ({ id }, context) => {
    requireAdmin(context);

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    await User.findByIdAndDelete(id);
    await notifyAdmins("user_deleted", `User "${user.name}" was deleted`);

    return true;
  },

  markNotificationRead: async ({ id }, context) => {
    requireAuth(context);
    await Notification.findByIdAndUpdate(id, { read: true });
    return true;
  },
};

export default resolvers;