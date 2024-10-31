const Joi = require('joi');

const email = Joi.string().email();
const newPassword = Joi.string().min(8);
const token = Joi.string();

const recoverEmailSchema = Joi.object({
  email: email.required(),
});

const confirmRecoverySchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = { recoverEmailSchema, confirmRecoverySchema}
