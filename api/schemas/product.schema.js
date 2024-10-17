const Joi = require('joi');

const id = Joi.number().id();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10).max(200);
const image = Joi.string().uri();
const categoryId = Joi.number().id();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const min_price = Joi.number().integer();
const max_price = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  min_price,
  max_price: max_price.when('min_price', {
    is: Joi.exist(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
