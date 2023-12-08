import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name:String,
    email:String,
    image:String
});


export const User = mongoose.models.User || model("User", UserSchema);
