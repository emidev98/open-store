const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

class UserService {

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = await models.User.create(data);

    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const res = await models.User.findAll({
      include: ['customer'],
    });

    return res;
  }

  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email },
    });

    return res;
  }


  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include: ['customer'],
    });
    if (!user) {
      throw boom.notFound(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);

    return res
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

module.exports = UserService;
