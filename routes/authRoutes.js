import express from "express";
import {
  registerUser,
  sendOtp,
  verifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

// Registration
router.post("/register", registerUser);

// Login Step 1: Send OTP
router.post("/send-otp", sendOtp);

// Login Step 2: Verify OTP
router.post("/verify-otp", verifyOtp);

export default router;
