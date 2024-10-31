const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const passwordHash = await bcrypt.hash(data.user.password, 10);
    data.user.password = passwordHash;

    const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id,
    });

    delete newCustomer.dataValues.password;
    return newCustomer;
  }

  async find() {
    const res = await models.Customer.findAll({
      include: ['user'],
    });

    return res;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!customer) {
      throw boom.notFound(`Customer with id ${id} not found`);
    }

    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const res = await customer.update(changes);

    return res;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return { id };
  }
}

module.exports = CustomerService;
