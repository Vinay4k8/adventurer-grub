import mongoose, { Schema, model } from "mongoose";
import { User } from "./User"; 

const BlogSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  banner: { type: String, required: true },
  content: { type: Object, required: true },
  tags:[{type:String}]
},{timestamps:true});


export const Blog = mongoose.models.Blog || model("Blog", BlogSchema);
