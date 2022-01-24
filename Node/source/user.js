const mongoose = require('./connection.js');

// Create a schema

const User_Schema = mongoose.Schema({
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
    age : {
        type: Date,
        required: true
    },
    country : {
        type: String
    }
});

mongoose.model('User', User_Schema); // Export the model

// Create a new user
const new_user = mongoose.model('User');

new new_user({
    name : 'root',
    email : 'root@root.com.br',
    password : 'root',
    age : new Date(2000, 1, 1),
    country : 'Brasil'
}).save().then(() => {
    console.log('User created');
}
).catch(err => {
    console.log(`Error creating user ${err}`);
});