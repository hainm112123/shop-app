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