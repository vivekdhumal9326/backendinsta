import express from "express";
import { adminLogin, newAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", newAdmin);

export default router;
