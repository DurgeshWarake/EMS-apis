import express from "express";
import { changePassword } from "../controllers/settingController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.put("/change-password", authMiddleware,changePassword);

export default router;
