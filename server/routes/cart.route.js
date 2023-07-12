import { Router } from "express";
import { getCart } from "../controllers/cart.controller.js";

const cartRoute = Router();

cartRoute.get('/', getCart);

export default cartRoute;