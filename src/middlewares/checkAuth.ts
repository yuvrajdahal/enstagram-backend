import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";
import User from "../models/user-model";
interface IDecodedProps {
  id: string;
}

export const checkAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = JSON.parse(req.headers.authorization.split(" ")[1]);
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IDecodedProps;

    const user = await User.findById(decoded?.id);

    if (!user) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
    console.log("\n --- Dont forget to type the decoed --- \n", decoded);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};
