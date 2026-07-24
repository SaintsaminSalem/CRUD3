import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {

        type: String,

        required: [true, "Name is required"],

        trim: true,

        minlength: 3,

        maxlength: 50

    },


    email: {

        type: String,

        required: [true, "Email is required"],

        unique: true,

        lowercase: true,

        trim: true,

        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email"
        ]

    },


    address: {

        type: String,

        required: [true, "Address is required"],

        trim: true

    },


    password: {

        type: String,

        required: [true, "Password is required"],

        minlength: 6

    },


    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
}

}, 
{
    timestamps: true
});


// Database indexing
userSchema.index({
    email: 1
});


export default mongoose.model("users", userSchema);