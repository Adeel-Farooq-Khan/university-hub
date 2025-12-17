import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["teacher", "student"], required: true, index: true },
    teacherId: { type: String, unique: true, sparse: true, index: true },
    studentId: { type: String, unique: true, sparse: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    roleTitle: { type: String }, // e.g. "Dean of Academics"
    department: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);


