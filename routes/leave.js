import express from "express";
import {
  addLeave,
  getLeaves,
  getLeave,
  getLeaveDetails,
  updateLeave,
} from "../controllers/leaveController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/detail/:id", authMiddleware, getLeaveDetails);
router.get("/:id/:role", authMiddleware, getLeave);
router.post("/add", authMiddleware, addLeave);
router.get("/", authMiddleware, getLeaves);
router.put("/:id", authMiddleware, updateLeave);

export default router;
