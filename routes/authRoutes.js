import express from "express";
import { joiValidator } from "../middleware/joiValidator.js";
import {
  registerSchema,
  sendOtpSchema,
  verifyOtpSchema, } from "../validations/authValidation.js";

import {
  registerUser,
  sendOtp,
  verifyOtp, } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", joiValidator(registerSchema), registerUser);
router.post("/send-otp", joiValidator(sendOtpSchema), sendOtp);
router.post("/verify-otp", joiValidator(verifyOtpSchema), verifyOtp);

export default router;
