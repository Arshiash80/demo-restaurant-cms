const MenuItem = require('../models/contents/MenuItem')
const Category = require('../models/contents/Category')

const User = require('../models/users/User')
const Role = require('../models/users/Role')

const layout = 'layouts/main_layout' 


// @route   GET - '/'.
// @desc    Renders home page.
exports.index = (req, res, next) => {
    res.render('index', { title: 'Express', layout: layout, user: "Arshia" });
}


// <-----|| 'LOGIN', 'LOGOUT' ||-----> //


// @route   GET - '/login'.
// @desc    Renders login page.
exports.login_get = (req, res, next) => {
   res.send("NOT IMPLEMENTED")
}
// @route   POST - '/login'.
// @desc    Handles login form.
exports.login_post = (req, res, next) => {
    // Do something..
}

// @route   GET - '/logout'.
// @desc    Renders logout page.
exports.logout_get = (req, res, next) => {
   res.send("NOT IMPLEMENTED")
}
// @route   POST - '/logout'.
// @desc    Handles logout form.
exports.logout_post = (req, res, next) => {
    // Do something..
}