const Sequelize = require('sequelize');
const sequelize = new Sequelize('NODE', 'root', 'root', {
    host : "localhost",
    dialect : "mysql",
});

module.exports = sequelize;