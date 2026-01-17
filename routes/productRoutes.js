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
import { joiValidator } from "../middleware/joiValidator.js";
import { createProductSchema } from "../validations/productValidation.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only 
router.post("/add",authMiddleware, adminMiddleware, joiValidator(createProductSchema), addProduct);

router.put("/update/:id", authMiddleware, adminMiddleware, joiValidator(createProductSchema), updateProduct);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
