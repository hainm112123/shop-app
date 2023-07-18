import { Router } from "express";
import { cancel, getOrders, received } from "../controllers/orders.controller.js";

const ordersRoute = Router();

ordersRoute.get('/get-orders', getOrders);
ordersRoute.post('/cancel/:itemId', cancel);
ordersRoute.post('/received/:itemId', received);

export default ordersRoute;