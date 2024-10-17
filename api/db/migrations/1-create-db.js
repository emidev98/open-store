'use strict';

const { USER_TABLE, UserSchema } = require('../models/users.model');
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
} = require('../models/order-product.model');
const { ORDER_TABLE, OrderSchema } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE, {
      force: true,
    });
    await queryInterface.dropTable(CUSTOMER_TABLE, {
      force: true,
    });
    await queryInterface.dropTable(CATEGORY_TABLE, {
      force: true,
    });
    await queryInterface.dropTable(PRODUCT_TABLE, {
      force: true,
    });
    await queryInterface.dropTable(ORDER_TABLE, {
      force: true,
    });
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE, {
      force: true,
    });
  },
};
