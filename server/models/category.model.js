const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  img: String
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;