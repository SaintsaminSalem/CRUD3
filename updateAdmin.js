import mongoose from "mongoose";
import User from "./model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const updateAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const result = await User.findOneAndUpdate(
    { email: "admin@gmail.com" },
    { role: "admin" },
    { new: true }
  );

  if (result) {
    console.log("Updated to admin:", result.email, result.role);
  } else {
    console.log("No user found with that email");
  }

  process.exit();
};

updateAdmin();