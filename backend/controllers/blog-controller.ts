import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User, { IUser } from "../model/User.js";
import { createApiResponse } from "../utils/ApiResponse.js";

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found" });
    }
    return res.status(200).json(
      createApiResponse(200, { blogs }, "Blogs found")
    );
  } catch (e: any) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const addBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { title, description, image, user } = req.body;
    const currentDate = new Date();
    try {
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Unable to find user by this id, Unauthorized" });
        }


    } catch (e: any) {
        return res.status(500).json({ success: false, message: e.message });
    }
}