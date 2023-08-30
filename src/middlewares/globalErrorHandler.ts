import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { logger } from "../utils/errorLogger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resource not found of id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = `Already exist`;
    error = new ErrorResponse(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e: any) => e.message);
    error = new ErrorResponse(message, 404);
  }
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`,
    { error: error.message }
  );

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    statusCode: error.statusCode || 500,
  });
  next();
};

export default errorHandler;
