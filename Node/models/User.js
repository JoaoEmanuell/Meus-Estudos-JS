const mongoose = require('../source/connection.js');
const Schema = mongoose.Schema;
// Create a schema

const User_Schema = new Schema({
    name : {
        type: String,
        required: true
    }, 
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    is_admin : {
        type: Boolean,
        default: false
    }
});

mongoose.model('Users', User_Schema); // Export the model
