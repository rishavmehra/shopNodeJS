
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'hide1337', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;