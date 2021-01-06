const MenuItem = require('../models/contents/MenuItem')
const Category = require('../models/contents/Category')
const User = require('../models/users/User')
const Role = require('../models/users/Role')

const async = require('async')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');


const passport = require('passport')


// @route   GET - '/'.
// @desc    Renders home page.
exports.index = (req, res, next) => {

    async.parallel({
        users: (callback) => {
            User.countDocuments().exec(callback)
        },
        roles: (callback) => {
            Role.countDocuments().exec(callback)
        },
        menuItems: (callback) => {
            MenuItem.countDocuments().exec(callback)
        },
        categories: (callback) => {
            Category.countDocuments().exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err) }
        // No Errors. So render.
        res.render('index', { users: results.users, roles: results.roles, categories: results.categories , menuItems: results.menuItems, user: req.user.username })
    })
}


// <-----|| 'LOGIN', 'LOGOUT' ||-----> //


// @route   GET - '/login'.
// @desc    Renders login page.
exports.login_get = (req, res, next) => {
   res.render('login_form', { layout:'login_form' })
}
// @route   POST - '/login'.
// @desc    Handles login form.
exports.login_post = [
    body('username').escape(),
    body('password').escape(),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty) {
            // There is an error.
            res.render('login_form', { layout:'login_form', errors: errors.array() })
        } else {
            // No validation errors. So authenticate the user.
            let data = req.body
            passport.authenticate('local', { 
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
                successFlash: `Welcome ${data.username}, Youre loggedin.`
              })(req, res, next)

        }
    }
]

// @route   GET - '/logout'.
// @desc    Renders logout page.
exports.logout_get = (req, res, next) => {
    req.logout();
    req.flash('success_msg', "You are logged out.")
    res.redirect('/login')
}
