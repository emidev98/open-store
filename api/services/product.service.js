const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const {price } = query;
    if (price) {
      options.where.price = price;
    }

    const { min_price, max_price } = query;
    if (min_price && max_price) {
      options.where.price = {
        [Op.gte]: min_price,
        [Op.lte]: max_price,
      };
    }


    const products = models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = models.Product.findByPk(id, {
      include: ['category'],
    });

    if (product.isDisabled) {
      throw boom.conflict(`Product with id ${id} is disabled`);
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound(`Product with id ${id} not found`);
    }
    this.products[index] = {
      ...this.products[index],
      ...changes,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);

    return { id };
  }
}

module.exports = ProductsService;
