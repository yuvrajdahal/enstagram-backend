import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookies from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { createServer } from "http";
import fileUpload from "express-fileupload";

import connectDb from "./configs/db";
import globalError from "./middlewares/globalErrorHandler";
import path from "path";
import dotenv from "dotenv";

import "./services/googlePassportService"; // Passport Google Stragety
import googleAuthRouter from "./routers/auth-route";
import userRouter from "./routers/user-route";
dotenv.config({ path: "src/configs/.env" });

const app = express();
const httpServer = createServer(app);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(cookies());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/v1/auth", googleAuthRouter);
app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
    res.send("Api is running");
});

app.use(globalError);

export default httpServer;
