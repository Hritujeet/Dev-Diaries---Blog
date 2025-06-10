import { Response, Request } from "express";
import { prisma } from "../../../utils/db";

export const fetchUserData = async (req: Request, res: Response) => {
    const email: string | undefined = req.params.email;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
        select: {
            Like: {
                select: {
                    post: {
                        select: {
                            title: true,
                            content: true,
                            description: true,
                            slug: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    Like: true,
                    Comment: true,
                },
            },
        },
    });

    const data = {
        likedPosts: user?.Like,
        likes: user?._count.Like,
        comments: user?._count.Comment,
    }

    res.json({ msg: "This is Fetch User Data : GET Request", data });
};
