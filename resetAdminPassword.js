import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const resetPassword = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const result = await User.findOneAndUpdate(
    { email: "admin@gmail.com" },
    { password: hashedPassword, role: "admin" },
    { new: true }
  );

  if (result) {
    console.log("Password reset for:", result.email, "| role:", result.role);
  } else {
    console.log("No user found with that email");
  }

  process.exit();
};

resetPassword();