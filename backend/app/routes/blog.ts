import express from "express";
import { getBlogs } from "../controllers/blog/getBlogs";
import { fetchBlogPost } from "../controllers/blog/blogPost";
import { likeBlog } from "../controllers/blog/likeBlog";
import {postComments} from "../controllers/blog/postComments";
import {fetchComments} from "../controllers/blog/fetchComments";

const router = express.Router();

router.get("/", getBlogs);
router.get("/post/:slug", fetchBlogPost);
router.get("/actions/comments/fetch", fetchComments);
router.post("/actions/:slug/like", likeBlog);
router.post("/actions/comments/post", postComments);

export default router;
