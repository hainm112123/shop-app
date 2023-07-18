import { Router } from "express";
import { cancel, received } from "../controllers/orders.controller.js";

const ordersRoute = Router();

ordersRoute.post('/cancel/:itemId', cancel);
ordersRoute.post('/received/:itemId', received);

export default ordersRoute;