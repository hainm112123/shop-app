import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  price: Number,
  img: String,
  category: String
});

const Product = model('Product', productSchema, 'products');

export default Product;