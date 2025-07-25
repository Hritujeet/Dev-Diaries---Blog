import {Response, Request} from "express";
import {prisma} from "../../../utils/db";

export const admin_fetchProjects = async (req: Request, res: Response)=>{
    const allProjects = await prisma.project.findMany({})
    res.json({msg:"This is Fetch Contact Forms : Get Request", allProjects});
}
