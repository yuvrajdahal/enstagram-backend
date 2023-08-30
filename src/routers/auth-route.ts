import express from "express";
import passport from "passport";
import { authController } from "../controllers/auth-controller";

const googleAuthRouter = express.Router();

googleAuthRouter.post("/", authController);

export default googleAuthRouter;
