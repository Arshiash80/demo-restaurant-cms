const MenuItem = require('../models/contents/MenuItem')
const Category = require('../models/contents/Category')

const User = require('../models/users/User')
const Role = require('../models/users/Role')

const layout = 'layouts/main_layout' 

// -----------------------------------------------------------------------
// ========= MENU ITEMS =========
// *****************************


// <-----|| 'LIST', 'DETAIL' ||-----> //

// @route   GET - '/menu/items/'.
// @desc    Renders menu item list page.
exports.menuItem_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}

// @route   GET - '/menu/item/:id'.
// @desc    Renders menu item detail page.
exports.menuItem_detail = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}


// <-----|| 'CREATE', 'UPDATE', 'DELETE' ||-----> //

// @route   GET - '/menu/item/create'.
// @desc    Renders menu item create page.
exports.create_menuItem_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/item/create'.
// @desc    Handle menu item create form.
exports.create_menuItem_post = (req, res, next) => {
    // DO SOMETHING ...
}

// @route   GET - '/menu/item/:id/update'.
// @desc    Renders menu item update page.
exports.update_menuItem_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/item/update'.
// @desc    Handle menu item update form.
exports.update_menuItem_post = (req, res, next) => {
    // DO SOMETHING ...
}

// @route   GET - '/menu/item/:id/delete'.
// @desc    Renders menu item delete page.
exports.delete_menuItem_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/item/delete'.
// @desc    Handle menu item delete form.
exports.delete_menuItem_post = (req, res, next) => {
    // DO SOMETHING ...
}

// -----------------------------------------------------------------------
// ========= MENU CATEGORIES =========
// ***********************************

// <-----|| 'LIST', 'DETAIL' ||-----> //

// @route   GET - '/menu/categories'.
// @desc    Renders menu categories list page.
exports.menuCategory_list = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   GET - '/menu/category/:id'.
// @desc    Renders menu categories detail page.
exports.menuCategory_detail = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}

// <-----|| 'CREATE', 'UPDATE', 'DELETE' ||-----> //

// @route   GET - '/menu/category/create'.
// @desc    Renders menu category create page.
exports.create_menuCategory_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/category/create'.
// @desc    Handle menu category create form.
exports.create_menuCategory_post = (req, res, next) => {
    // DO SOMETHING ...
}

// @route   GET - '/menu/category/:id/update'.
// @desc    Renders menu category update page.
exports.update_menuCategory_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/category/update'.
// @desc    Handle menu category update form.
exports.update_menuCategory_post = (req, res, next) => {
    // DO SOMETHING ...
}

// @route   GET - '/menu/category/:id/delete'.
// @desc    Renders menu category delete page.
exports.delete_menuCategory_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED")
}
// @route   POST - '/menu/category/delete'.
// @desc    Handle menu category delete form.
exports.delete_menuCategory_post = (req, res, next) => {
    // DO SOMETHING ...
}
// -----------------------------------------------------------------------
