import Product from "../models/productModel.js";

export const createProductService = async (data) => {
  return await Product.create(data);
};

export const getProductsService = async () => {
  return await Product.find();
};

export const getProductByIdService = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  return product;
};

export const updateProductService = async (id, data) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  Object.assign(product, data);
  await product.save();

  return product;
};

export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
};
