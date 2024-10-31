const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bycrypt = require('bcrypt');

const AuthService = require('../../../services/auth.service');

const authService = new AuthService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await authService.getUser(email, password);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;
