const Sequelize = require('sequelize');
const { config } = require('../config/config');

const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: config.env === 'development' ? console.log : false,
});

setupModels(sequelize);

module.exports = sequelize;
