const User = require('../models/users/User')
const Role = require('../models/users/Role')

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
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/users/create'.
// @desc    Handle user create form.
exports.create_user_post = (req, res, next) => {
    // Do something..
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