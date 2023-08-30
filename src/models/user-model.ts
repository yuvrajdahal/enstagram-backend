import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  generateJsonWebToken: () => string;
  _id: Schema.Types.ObjectId;
  googleId: string;
  email: string;
  profilePicture?: string;
  followers: number;
  posts: number;
  following: number;
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: {
    type: String,
    required: [true, "Id token must be provided"],
    unique: true,
  },
  profilePicture: { type: String },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true,
  },
  followers: {
    type: Number,
    default: 0,
  },
  posts: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
});

// Method to generate JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
