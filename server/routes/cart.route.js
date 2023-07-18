import { Router } from "express";
import { addToCart, getCart, purchase, removeFromCart } from "../controllers/cart.controller.js";
import { vefiryProduct } from "../middlewares/cart.middleware.js";

const cartRoute = Router();

cartRoute.get('/', getCart);
cartRoute.post('/add/:product', vefiryProduct, addToCart);
cartRoute.post('/remove/:product', vefiryProduct, removeFromCart);
cartRoute.post('/purchase', purchase);

export default cartRoute;