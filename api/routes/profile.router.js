const express = require('express');
const passport = require('passport');
const router = express.Router();

const OrderService = require('../services/order.service');
const orderService = new OrderService();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await orderService.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
