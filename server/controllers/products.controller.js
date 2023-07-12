import Product from '../models/product.model.js';

export async function getProducts(req, res) {
  const options = req.query.category ? { category: req.query.category } : {};
  const products = await Product.find(options);
  return res.json(products);
}