const MenuItem = require('../models/contents/MenuItem')
const Category = require('../models/contents/Category')

const User = require('../models/users/User')
const Role = require('../models/users/Role')

const layout = 'layouts/main_layout' 


// <-----|| 'LIST', 'DETAIL' ||-----> //


// @route   GET - '/menu'.
// @desc    Renders menu items list page.
exports.menuItems_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}

// @route   GET - '/menu/:id'.
// @desc    Renders menu item detail page.
exports.menuItems_detail = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}


// <-----|| 'CREATE', 'UPDATE', 'DELETE' ||-----> //


// @route   GET - '/menu/create'.
// @desc    Renders menu item create page.
exports.create_menuItem_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/create'.
// @desc    Handle menu item create form.
exports.create_menuItem_post = (req, res, next) => {
    // DO SOMETHING ...
}

// @route   GET - '/menu/:id/update'.
// @desc    Renders menu item update page.
exports.update_menuItem_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/update'.
// @desc    Handle menu item update form.
exports.update_menuItem_post = (req, res, next) => {
    // DO SOMETHING ...
}

// @route   GET - '/menu/:id/delete'.
// @desc    Renders menu item delete page.
exports.delete_menuItem_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/delete'.
// @desc    Handle menu item delete form.
exports.delete_menuItem_post = (req, res, next) => {
    // DO SOMETHING ...
}