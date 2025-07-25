import {Response, Request} from "express";
import { prisma } from "../../../utils/db";

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const allPosts = await prisma.blogPost.findMany({
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                views: true,
                _count: {
                    select: {
                        Like: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // Transform the data to match frontend expectations
        const transformedPosts = allPosts.map(post => ({
            title: post.title,
            slug: post.slug,
            description: post.description,
            createdAt: post.createdAt,
            likes: post._count.Like,
            views: post.views
        }));

        res.json({
            msg: "This is All Blogs : GET Request", 
            allPosts: transformedPosts
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({
            msg: "Error fetching blogs",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}