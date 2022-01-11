const Sequelize = require('sequelize');
const connection = require('./connection');

const User = connection.define('user', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

// Create User

User.create({ name : "root", password : "root"});