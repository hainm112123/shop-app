import Category from '../models/category.model.js';

export async function getCategories(req, res) {
  const categories = await Category.find();
  return res.json(categories);
}