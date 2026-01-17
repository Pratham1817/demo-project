import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/productService.js";

export const addProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json({ success: true, product });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProducts = async (req, res) => {
  const products = await getProductsService();
  res.json({ success: true, products });
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.json({ success: true, product });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    res.json({ success: true, product });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await deleteProductService(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
