import express from "express";
import { addAddress, getAddresses, updateAddress } from "../controllers/addressController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get logged-in user addresses
router.get("/", authMiddleware, getAddresses);

// Add new address
router.post("/add", authMiddleware, addAddress);

// Update existing address
router.put("/update", authMiddleware, updateAddress);

export default router;
