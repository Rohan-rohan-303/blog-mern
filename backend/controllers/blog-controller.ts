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
        const blog = new Blog({
            title,
            description,
            image,
            user,
            createdAt: currentDate
        });

        //for acid transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        await blog.save({session});
        existingUser.blogs.push(blog._id as mongoose.Types.ObjectId);
        await existingUser.save({ session });
        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({ success: true, message: "Blog added successfully" });

    } catch (e: any) {
        return res.status(500).json({ success: false, message: e.message });
    }
}

export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const blogId = req.params.id;
  const { title, desc } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { title, desc }, { new: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, message: "Blog updated successfully" });

  } catch (e: any) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const blogId = req.params.id;
    try {
      const blog = await Blog.findByIdAndDelete(blogId).populate<{ user: IUser }>("user");
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }

    const user = blog.user;
    if (user && user.blogs) {
      // safely removing blog reference
      (user.blogs as any).pull(blog._id);
      await user.save();
    }
        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (e: any) {
        return res.status(500).json({ success: false, message: e.message });
    }
}

export const getBlogById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const blogId = req.params.id;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, data: { blog } });
    } catch (e: any) {
        return res.status(500).json({ success: false, message: e.message });
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: { user } });
    } catch (e: any) {
        return res.status(500).json({ success: false, message: e.message });
    }
}