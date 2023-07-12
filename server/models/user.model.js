import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String, 
  password: String,
  phone: String,
  permission: String,
  cart: [{
    product: String,
    quantity: Number
  }]
});

const User = model('User', userSchema, 'users');

export default User;