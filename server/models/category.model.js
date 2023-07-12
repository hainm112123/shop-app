import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  title: String,
  img: String
});

const Category = model('Category', categorySchema, 'categories');

export default Category;