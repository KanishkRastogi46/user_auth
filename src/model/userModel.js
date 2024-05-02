import mongoose from "mongoose";
//import bcryptjs from "bcryptjs"
//import connectBD from "../dbConfig/index.ts";

const userSchema= mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
},{
    timestamps: true
});

const user= mongoose.models.Users || mongoose.model('Users', userSchema);

export default user;