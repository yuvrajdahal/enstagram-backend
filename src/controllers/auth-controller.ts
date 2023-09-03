import jwt from "jsonwebtoken";
import { CookieOptions, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User, { IUser } from "../models/user-model";

export const authController = asyncHandler(async (req, res) => {
  const {
    token,
    email,
    profilePicture,
    followers,
    following,
    posts,
  }: {
    token: string;
    email: string | undefined;
    profilePicture?: string | undefined;
    followers: number | undefined;
    following: number | undefined;
    posts: number | undefined;
  } = req.body;

  const decodedToken = jwt.decode(token);

  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    sendTokenResponse(existingUser, 200, res);
    return;
  }
  const user = await User.create({
    idToken: token,
    email,
    profilePicture,
    followers,
    following,
    posts,
  });

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const token = user.generateJsonWebToken();
  const expiry = new Date(
    Date.now() +
      ((process.env.JWT_COOKIE_EXPIRE as any) ?? 20) * 24 * 60 * 60 * 1000
  );

  const options: CookieOptions = {
    expires: expiry,
    httpOnly: true,
  };
  // cookie is optional
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true,user,token });

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
};
