import { Request, Response } from "express";
import slugify from "slugify";
import { prisma } from "../../../utils/db";

type BlogPostBody = {
    title: string;
    description: string;
    content: string;
};

export const admin_addBlog = async (req: Request, res: Response) => {
    const blogData: BlogPostBody = req.body;
    const slug: string = slugify(blogData.title);

    const post = await prisma.blogPost.create({
        data: {
            title: blogData.title,
            slug: slug,
            content: blogData.content,
            description: blogData.description
        }
    });

    res.json({ msg: "This is Admin Add Post : Post Request", post });
};
