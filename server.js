import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import addressRoutes from "./routes/addressRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


import dotenv from "dotenv";

dotenv.config(); 

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/auth", adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
