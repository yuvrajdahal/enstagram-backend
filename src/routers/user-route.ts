import express from "express";
import {
  createStoryController,
  getStoryController,
  getStoriesController,
  deleteStoryController,
} from "../controllers/user-controller";
import { checkAuthMiddleware } from "../middlewares/checkAuth";

const userRouter = express.Router();

userRouter.use("/", checkAuthMiddleware);

userRouter.route("/stories").post(createStoryController);
userRouter.route("/stories").get(getStoriesController);
userRouter.route("/stories/:id").get(getStoryController);
userRouter.route("/stories/:id").delete(deleteStoryController);

userRouter.route("/").get(getStoriesController);

export default userRouter;
