import mongoose from "mongoose";

// Crearnos el Schema de datos para los usuarios

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
});

export const userModel = mongoose.model("user", userSchema);