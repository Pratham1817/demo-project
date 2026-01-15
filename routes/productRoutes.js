import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public 
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/add", authMiddleware, adminMiddleware, addProduct);
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
