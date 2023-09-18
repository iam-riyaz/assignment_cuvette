import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String,},
    password: { type: String },
    ipData: {type:Object, default:{}},
    phone: { type: Number },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
