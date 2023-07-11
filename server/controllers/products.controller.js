const Product = require('../models/product.model');

module.exports = {
  getProducts: async (req, res) => {
    const options = req.query.category ? {category: req.query.category} : {};
    const products = await Product.find(options);
    return res.json(products);
  }
}