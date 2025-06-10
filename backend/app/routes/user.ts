import express, { Router } from "express";
import { fetchUserData } from "../controllers/user/fetchUserData";
import { create_user } from "../controllers/user/create-user"; // Fixed import path

const router: Router = express.Router();

router.get("/:username", fetchUserData);
router.post("/create-user", create_user);

export default router;