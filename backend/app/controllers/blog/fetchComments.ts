import { Request, Response } from "express";
import { prisma } from "../../../utils/db";

export const fetchComments = async (req: Request, res: Response) => {
    try {
        const { postId } = req.query as { postId: string };
        
        const allComments = await prisma.comment.findMany({
            where: {
                post: {
                    id: postId
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc', // Most recent comments first
            }
        });

        // Format comments for frontend consumption
        const formattedComments = allComments.map(comment => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            userName: comment.user.name,
            userEmail: comment.user.email,
            userId: comment.user.id,
            postId: comment.blogPostId,
            timeAgo: getTimeAgo(comment.createdAt),
        }));

        res.json({
            msg: "This is Fetch comments", 
            allComments: formattedComments,
            total: allComments.length
        });

    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ 
            error: "Failed to fetch comments",
            allComments: []
        });
    }
};

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}