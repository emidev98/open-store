const express = require('express');
const passport = require('passport');
const { recoverEmailSchema, confirmRecoverySchema } = require('../schemas/auth.schema');
const validatorHandler = require('./../middlewares/validator.handler');
const AuthService = require('../services/auth.service');

const router = express.Router();
const authService = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.json(authService.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/recovery',
  validatorHandler(recoverEmailSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await authService.sendPasswordRecovery(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);


router.post(
  '/change-password',
  validatorHandler(confirmRecoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await authService.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
