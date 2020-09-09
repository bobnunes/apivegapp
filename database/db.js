const Sequelize = require('sequelize');
const dbConfig = require('../config/db.js');

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;