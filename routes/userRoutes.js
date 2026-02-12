import express from "express";

import {
  submitUser,
  getAllUsers,
  getUserById,
  updateVerify,
  deleteUser
} from "../controllers/userController.js";

import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* Public */
router.post("/submit", submitUser);
router.delete("/delete/:id", deleteUser);

/* Admin */
router.get("/", verifyAdmin, getAllUsers);
router.get("/:id", verifyAdmin, getUserById);
router.put("/verify/:id", verifyAdmin, updateVerify);

export default router;
