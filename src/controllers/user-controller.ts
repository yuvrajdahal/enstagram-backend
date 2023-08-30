import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import Story from "../models/story-model";
import User from "../models/user-model";

export const createStoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { picture } = req.body;
    if (!req.user) return;

    const user = req.user;

    const story = await Story.create({
      //@ts-ignore
      user: user._id,
      story: picture,
    });
    res.json({
      data: "Story sucessfully created",
      succes: true,
    });
  }
);
export const getStoriesController = asyncHandler(
  async (req: Request, res: Response) => {
    const stories = await Story.find();
    res.json({
      data: stories,
      succes: true,
    });
  }
);
export const getStoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const story = await Story.findById(id);

    res.json({
      data: story,
      succes: true,
    });
  }
);

export const deleteStoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await Story.findByIdAndDelete(id);

    res.json({
      data: "Deleted successfully",
      succes: true,
    });
  }
);
export const getUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find();

    res.json({
      data: users,
      succes: true,
    });
  }
);
