import { Response, Request } from "express";
import { prisma } from "../../../utils/db";

export const create_user = async (
    req: Request,
    res: Response
): Promise<void> => {
    // Method check should be uppercase "POST"
    if (req.method === "POST") {
        const { email, name, image, emailVerified } = req.body;
       
        if (!email) {
            res.status(400).json({ error: "Email is required" });
            return;
        }
       
        try {
            // First check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                // User already exists, return existing user data
                console.log("User already exists:", existingUser.email);
                res.status(200).json({
                    success: true,
                    message: "User already exists",
                    user: {
                        id: existingUser.id,
                        email: existingUser.email,
                        name: existingUser.name,
                        image: existingUser.image,
                        emailVerified: existingUser.emailVerified,
                    },
                });
                return;
            }

            // User doesn't exist, create new user
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    image,
                    emailVerified: emailVerified
                        ? new Date(emailVerified)
                        : null,
                },
            });
           
            console.log("User created successfully:", user.email);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    emailVerified: user.emailVerified,
                },
            });
        } catch (error) {
            console.error("Prisma error:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
                message: "Failed to create user",
            });
        }
    } else {
        // Handle non-POST requests
        res.status(405).json({
            success: false,
            error: "Method not allowed",
            message: "Only POST requests are allowed for this endpoint"
        });
    }
};