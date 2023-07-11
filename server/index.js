require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const categoriesRoute = require('./routes/categories.route');
const productsRoute = require('./routes/products.route');

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  app.use(bodyParser.json()) 
  app.use(bodyParser.urlencoded({ extended: true })) 
  app.use(cookieParser(process.env.SESSION_SECRET));

  app.use(cors());

  app.get('/', (req, res) => {
    res.send("Shopping App");
  });

  app.use('/categories', categoriesRoute);
  app.use('/products', productsRoute);

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