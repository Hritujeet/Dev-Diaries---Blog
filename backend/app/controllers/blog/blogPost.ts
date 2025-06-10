import { Response, Request } from "express";
import { prisma } from "../../../utils/db";

export const fetchBlogPost = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const userEmail = req.query.email as string;

    const post = await prisma.blogPost.update({
        where: { slug },
        data: { views: { increment: 1 } },
    });
    
    if (!post) {
        res.status(404).json({ msg: "No such Post Found" });
    }

    let alreadyLiked = false;
    if (userEmail) {
        const like = await prisma.like.findFirst({
            where: {
                user: { email: userEmail },
                post: { id: post?.id },
            },
        });
        alreadyLiked = !!like;
    }

    res.json({ post, alreadyLiked });
};
