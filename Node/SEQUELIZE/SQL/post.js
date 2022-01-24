const db = require('./connection');

const Post = db.sequelize.define('post', {
    id : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    content : {
        type : db.Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Post;