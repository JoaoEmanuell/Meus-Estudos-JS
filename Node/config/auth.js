// Imports
// Global imports
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Local imports
// Model imports
require('../models/User');
const User = mongoose.model('Users');

module.exports = function (passport) {
    passport.use(new localStrategy({usernameField : 'email'}, (email, password, done) => {
        User.findOne({email : email}).then((user) => {
            if (!user){
                return done(null, false, {message : 'This account not exist'});
            }else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (isMatch){
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message : "Password incorrect"});
        }})}});
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}