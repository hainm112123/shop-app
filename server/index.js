import 'dotenv/config.js'

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect } from 'mongoose';

const app = express();
const port = 3000;

import categoriesRoute from './routes/categories.route.js';
import productsRoute from './routes/products.route.js';
import authRoute from './routes/auth.route.js';
import cartRoute from './routes/cart.route.js';
import { requireAuth } from './middlewares/auth.middleware.js';

const main = async () => {
  await connect(process.env.MONGO_URL);

  app.use(bodyParser.json()) 
  app.use(bodyParser.urlencoded({ extended: true })) 
  app.use(cookieParser(process.env.SESSION_SECRET));

  app.use(cors());

  app.get('/', (req, res) => {
    res.send("Shopping App");
  });

  app.use('/categories', categoriesRoute);
  app.use('/products', productsRoute);
  app.use('/auth', authRoute);
  app.use('/cart', requireAuth, cartRoute);

  app.listen(port, process.env.SERVER_HOST, () => {
    console.log("Server started");
  })
}

try {
  main();
  console.log('Database connected');
} catch (err) {
  console.error(err);
}