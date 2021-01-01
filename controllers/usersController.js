const User = require('../models/users/User')
const Role = require('../models/users/Role')
const async = require('async')

const { body, validationResult } = require('express-validator');

const layout = 'layouts/main_layout' 

// <-----|| 'LIST', 'DETAIL' ||-----> //


// @route   GET - '/users'.
// @desc    List all users.
exports.users_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}

// @route   GET - '/users/:id'.
// @desc    Render a detail page for specific user.
exports.users_detail = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}


// <-----|| 'CREATE', 'EDIT', 'DELETE' ||-----> //


// @route   GET - '/users/create'.
// @desc    Render user create page.
exports.create_user_get = (req, res, next) => {
    async.parallel({
        roles: (callback) => {
            Role.find().exec(callback)
        }
    }, (err, results) => {
        if (err) { return next(err) }
        res.render("create_user_form", { title: "Create A New User", roles: results.roles })
    })
}
// @route   POST - '/users/create'.
// @desc    Handle user create form.
exports.create_user_post = (req, res, next) => {
    console.log("req.body : ", req.body)
    res.send(req.body)
}

// @route   GET - '/users/:id/edit'.
// @desc    Render user edit page.
exports.edit_user_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/users/:id/edit'.
// @desc    Handle user edit form.
exports.edit_user_post = (req, res, next) => {
    // Do something..
}

// @route   GET - '/users/:id/delete'.
// @desc    Render user delete page.
exports.delete_user_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/users/:id/delete'.
// @desc    Handle user delete form.
exports.delete_user_post = (req, res, next) => {
    // Do something..
}

// -----------------------------------------------
// ======= USERS ROLE =======
// -----------------------------------------------


// @route   GET - '/users/roles'.
// @desc    List all roles.
exports.userRole_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}

// @route   GET - '/users/role/:id'.
// @desc    Render a detail page for specific role.
exports.userRole_detail = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}


// <-----|| 'CREATE', 'EDIT', 'DELETE' ||-----> //


// @route   GET - '/users/role/create'.
// @desc    Render role create page.
exports.create_userRole_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/users/role/create'.
// @desc    Handle role create form.
exports.create_userRole_post = (req, res, next) => {
    // Do something..
}

// @route   GET - '/users/role/:id/edit'.
// @desc    Render role edit page.
exports.edit_userRole_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/users/role/:id/edit'.
// @desc    Handle role edit form.
exports.edit_userRole_post = (req, res, next) => {
    // Do something..
}

// @route   GET - '/users/role/:id/delete'.
// @desc    Render role delete page.
exports.delete_userRole_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/users/role/:id/delete'.
// @desc    Handle role delete form.
exports.delete_userRole_post = (req, res, next) => {
    // Do something..
}