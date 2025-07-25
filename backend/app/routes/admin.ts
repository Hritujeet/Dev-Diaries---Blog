import express, {Router} from "express";
import {admin_addBlog} from "../controllers/admin/addBlog";
import {admin_fetchProjects} from "../controllers/admin/fetchProjects";

const router: Router = express.Router();

router.post("/posts/add", admin_addBlog);
router.get("/fetchProjects", admin_fetchProjects)

export default router;

