import {Router} from "express";

import {getAllBlogs, getBlogById, addBlog, updateBlog, deleteBlog, getUserById} from "../controllers/blog-controller";

const router = Router();

// Get all blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getUserById);

export default router;
