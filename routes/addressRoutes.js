import express from "express";
import { addAddress, getAddresses, updateAddress } from "../controllers/addressController.js";
import authMiddleware from "../middleware/auth.js";
import { joiValidator } from "../middleware/joiValidator.js";
import { createAddressSchema } from "../validations/addressValidation.js";

const router = express.Router();

// Get logged-in user addresses
router.get("/", authMiddleware, getAddresses);

//add new address
router.post("/add",authMiddleware, joiValidator(createAddressSchema),addAddress);

// Update existing address
router.put("/update", authMiddleware, joiValidator(createAddressSchema),updateAddress);

export default router;
