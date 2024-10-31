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

function checkAdminRole(req, res, next) {
  const { role } = req.user;
  if (role === 'admin') {
    return next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      return next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = {
  checkApiKey,
  checkAdminRole,
  checkRoles
};
