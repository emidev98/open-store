const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JWTStrategy = new Strategy(options, (payload, done) => {
  try {
    if (payload.sub) {
      return done(null, payload);
    }
    return done(boom.unauthorized(), false);
  } catch (error) {
    return done(error);
  }
});

module.exports = JWTStrategy;
