import Product from "../models/productModel.js";

// Add new product
export async function addProduct(req, res) {
  const { name, description, price, category, stock, images } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: "Name and price are required" });
  }

  try {
    const product = await Product.create({ name, description, price, category, stock, images });
    res.status(201).json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get all products
export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get single product by ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Update product
export async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const { name, description, price, category, stock, images } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (images !== undefined) product.images = images;

    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Delete product
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

