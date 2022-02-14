// Global Imports

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Local Imports
// Model Imports

require('../models/User');
const User = mongoose.model('Users');

// Validation Imports
const user_validation = require('../validations/UserValidation');

router.get('/', (req, res) => {
    res.redirect('/user/register');
});

router.get('/register', (req, res) => {
    res.render('./users/register');
});

router.post('/new', (req, res) => {
    const user = user_validation(req.body);
    if (user.status){
        req.flash('error_msg', user.erros[0].text);
        res.redirect('/user/register');
    }else {
        new User(user.user).save().then(() => {
            req.flash('success_msg', 'Usuario criado com sucesso!');
            res.redirect('/user/register');
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao criar usuario!');
            res.redirect('/user/register');
        });
    }
});

module.exports = router;