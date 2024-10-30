const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const orderRouter = require('./orders.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);

  router.use('/auth', authRouter);
}

module.exports = routerApi;
