import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./model/userModel.js";
import dotenv from "dotenv";


dotenv.config();


const createAdmin = async()=>{


await mongoose.connect(process.env.MONGO_URL);



const hashedPassword = await bcrypt.hash(
"admin123",
10
);



await User.create({

name:"Admin",

email:"admin@gmail.com",

address:"Admin Office",

password:hashedPassword,

role:"admin"

});


console.log("Admin created");


process.exit();

};


createAdmin();