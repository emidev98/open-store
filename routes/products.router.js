const express = require('express');
const router = express.Router();

const ProductsService = require('../services/products.service');
const validatorHanlder = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');
const service = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHanlder(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  validatorHanlder(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);

      res.status(201).json(newProduct);
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:id',
  validatorHanlder(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      res.json(product);
    } catch (e) {
      next(e);
    }
  },
);

router.patch(
  '/:id',
  validatorHanlder(getProductSchema, 'params'),
  validatorHanlder(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(e);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await service.delete(id);

    res.json(deleted);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
