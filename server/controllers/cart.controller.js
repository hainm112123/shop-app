import Product from "../models/product.model.js";

export async function getCart(req, res) {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).send('User not found');
  }
  const cart = await Promise.all(user.cart.map(async (item) => {
    const product = await Product.findById(item.product);
    return {
      product,
      quantity: item.quantity,
    }
  }));
  return res.json(cart);
}

export async function addToCart(req, res) {
  let { user } = res.locals;
  const { product } = req.params;
  const index = user.cart.findIndex((item) => item.product === product);
  if (index === -1) {
    user.cart.push({
      product,
      quantity: 1
    });
  }
  else {
    user.cart[index].quantity++;
  }
  user = await user.save();
  return res.json(user.cart);
}

export async function removeFromCart(req, res) {
  let { user } = res.locals;
  const { product } = req.params;
  const index = user.cart.findIndex((item) => item.product === product);
  if (index === -1) {
    return res.status(401).send('Invalid product removal');
  }
  user.cart[index].quantity--;
  if (user.cart[index].quantity === 0) user.cart.splice(index, 1);
  user = await user.save();
  return res.json(user.cart);
}

export async function purchase(req, res) {
  let { user } = res.locals;
  const orders = user.cart.map((item) => ({ ...item, state: 'toship' }))
  user.orders = user.orders.concat(orders);
  user.cart = [];
  user = await user.save();
  return res.json(user.orders);
}