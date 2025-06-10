import { Response, Request } from "express";
import { prisma } from "../../../utils/db";
import { connect } from "http2";

export const likeBlog = async (req: Request, res: Response) => {
    let alreadyLiked: boolean;
    let madeLike: boolean;

    const slug = req.params.slug as string;
    const user = req.body.email as string;

    const like = await prisma.like.findFirst({
        where: {
            user: {
                email: user,
            },
            post: {
                slug: slug,
            },
        },
    });

    if (like) {
        alreadyLiked = true;
        madeLike = false;
    } else {
        const newLike = await prisma.like.create({
            data: {
                user: {
                    connect: {
                        email: user,
                    },
                },
                post: {
                    connect: {
                        slug: slug,
                    },
                },
            },
        });
        alreadyLiked = false;
        madeLike = true;
        console.log(newLike);
    }

    res.json({ msg: "This is Like Blogs : POST Request", alreadyLiked, madeLike });
};
