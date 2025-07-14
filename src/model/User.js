import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.models.users || mongoose.model("users", UserSchema);
