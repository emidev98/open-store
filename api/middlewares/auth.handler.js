const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api-key'];
  if (apiKey === config.apiKey) {
    return next();
  } else {
    next(boom.unauthorized());
  }

  next();
}

module.exports = {
  checkApiKey
};
