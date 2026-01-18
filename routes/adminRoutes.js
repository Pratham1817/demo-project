import express from "express";
import { joiValidator } from "../middleware/joiValidator.js";
import {
  registerSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from "../validations/authValidation.js";

import {
  registerAdmin,
  sendAdminOtp,
  verifyAdminOtp,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", joiValidator(registerSchema), registerAdmin);
router.post("/send-otp", joiValidator(sendOtpSchema), sendAdminOtp);
router.post("/verify-otp", joiValidator(verifyOtpSchema), verifyAdminOtp);

export default router;
