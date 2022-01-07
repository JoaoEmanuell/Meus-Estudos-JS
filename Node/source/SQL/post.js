const Sequelize = require('sequelize');
const connection = require('./connection');

const Post = connection.define('post', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },
    content : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

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

//User.sync({force : true}); Create table in database

// Create Post

Post.create({ title : "Post 1", content : "Content 1"});