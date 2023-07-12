import Product from "../models/product.model.js";

export async function vefiryProduct(req, res, next) {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).send('User not found');
  }
  const { product } = req.params;
  if (!product) {
    return res.status(401).send('Product not found');
  }

  try {
    const productOf = await Product.findById(product);
  } catch(err) {
    return res.status(401).send('Product does not exist');
  }

  next();
}