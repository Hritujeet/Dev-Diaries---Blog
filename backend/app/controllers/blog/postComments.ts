import { Request, Response } from "express";
import { prisma } from "../../../utils/db";

export const postComments = async (req: Request, res: Response) => {
    try {
        const { props_postId, commentText, user } = req.body;

        console.log("Request body:", { props_postId, commentText, user });

        // Validate required fields
        if (!props_postId || !commentText || !user) {
            res.status(400).json({
                error: "Missing required fields",
                required: ["props_postId", "commentText", "user"],
                received: {
                    props_postId: !!props_postId,
                    commentText: !!commentText,
                    user: !!user,
                },
            });
        }

        // Validate comment text length
        if (commentText.trim().length === 0) {
            res.status(400).json({
                error: "Comment text cannot be empty",
            });
        }

        if (commentText.length > 1000) {
            res.status(400).json({
                error: "Comment text too long (max 1000 characters)",
            });
        }

        // Check if post exists
        const existingPost = await prisma.blogPost.findUnique({
            where: {
                id: props_postId as string,
            },
        });

        if (!existingPost) {
            res.status(404).json({
                error: "Post not found",
            });
        }

        // Find user by name
        const existingUser = await prisma.user.findFirst({
            where: {
                name: user as string,
            },
        });

        if (!existingUser) {
            res.status(404).json({
                error: "User not found",
            });
        }

        // Create the comment
        const newComment = await prisma.comment.create({
            data: {
                content: commentText.trim(),
                post: {
                    connect: {
                        id: props_postId as string,
                    },
                },
                user: {
                    connect: {
                        id: existingUser?.id,
                    },
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        console.log("Comment created successfully:", newComment.id);

        res.status(201).json({
            success: true,
            message: "Comment posted successfully",
            comment: {
                id: newComment.id,
                content: newComment.content,
                createdAt: newComment.createdAt,
                user: newComment.user,
                postId: newComment.post.id,
            },
        });
    } catch (err: Error | any) {
        console.error("Error posting comment:", err);

        // Handle specific Prisma errors
        if (err instanceof Error) {
            if (err.message.includes("Foreign key constraint")) {
                res.status(400).json({
                    error: "Invalid post ID or user ID",
                });
            }

            if (err.message.includes("Unique constraint")) {
                res.status(409).json({
                    error: "Duplicate comment detected",
                });
            }
        }

        // Only send response if headers haven't been sent
        if (!res.headersSent) {
            res.status(500).json({
                error: "Internal server error",
                message:
                    process.env.NODE_ENV === "development"
                        ? err.message
                        : "Something went wrong",
            });
        }
    }
};
