const Category = require('../models/category.model');

module.exports = {
  getCategories: async (req, res) => {
    const categories = await Category.find();
    return res.json(categories);
  }
}