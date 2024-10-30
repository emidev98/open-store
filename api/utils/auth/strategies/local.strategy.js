const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bycrypt = require('bcrypt');

const UserService = require('../../../services/user.service');

const userService = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
  try {
    const user = await userService.findByEmail(email);
    if (!user) {
      return done(boom.unauthorized(), false);
    }
    const matchPassword = await bycrypt.compare(password, user.password);
    if (!matchPassword) {
      return done(boom.unauthorized(), false);
    }
    delete user.dataValues.password;
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
