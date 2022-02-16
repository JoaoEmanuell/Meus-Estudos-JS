// Global Imports

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passaport = require('passport');

// Local Imports
// Model Imports

require('../models/User');
const User = mongoose.model('Users');

// Validation Imports
const user_validation = require('../validations/UserValidation');
//const encrypt = require('../source/encrypt');

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
        User.findOne({email : user.user.email}).then((email) => {
            if (email){
                req.flash('error_msg', 'Email já cadastrado!');
                res.redirect('/user/register');
            } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.user.password, salt, (err, hash) => {
                    if (err){
                        req.flash('error_msg', 'Erro ao cadastrar usuário!');
                        res.redirect('/user/register');
                    }
                    else{
                        user.user.password = hash;
            new User(user.user).save().then(() => {
                req.flash('success_msg', 'Usuario criado com sucesso!');
                res.redirect('/user/register');
            }).catch((err) => {
                req.flash('error_msg', `Erro ao criar usuario! ${err}`);
                res.redirect('/user/register');
            });
            }})});
        }}).catch((err) => {
            req.flash('error_msg', `Erro ao criar usuario! ${err}`);
            res.redirect('/user/register');
        });
    }
});

router.get('/login', (req, res) => {
    res.render('./users/login');
});

router.post('/login_post', (req, res, next) => {
    passaport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logout realizado com sucesso!');
    res.redirect('/');
})

module.exports = router;