const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuController')
const { esureAuthenticated } = require('../configs/passport/auth')

const permit = require('../middlewares/authorization')

// -----------------------------------------------------------------------
// ========= MENU ITEMS =========
// ******************************

// -GET- request to --> '/menu/items'
router.get('/items/', esureAuthenticated,menuController.menuItem_list)

// -GET- request to --> '/menu/item/:id'
router.get('/item/:id', esureAuthenticated,menuController.menuItem_detail)

// -GET- request to --> '/menu/item/create'
router.get('/item/create', permit("create", null),esureAuthenticated,menuController.create_menuItem_get)

// -POST- request to --> '/menu/item/create'
router.post('/item/create',  permit("create", null),esureAuthenticated,menuController.create_menuItem_post)

// -GET- request to --> '/menu/item/update'
router.get('/item/:id/update',  permit("update", null),esureAuthenticated,menuController.update_menuItem_get)

// -POST- request to --> '/menu/item/update'
router.post('/item/:id/update',  permit("update", null),esureAuthenticated,menuController.update_menuItem_post)

// -GET- request to --> '/menu/item/delete'
router.get('/item/:id/delete',  permit("delete", null),esureAuthenticated,menuController.delete_menuItem_get)

// -POST- request to --> '/menu/item/delete'
router.post('/item/:id/delete',  permit("delete", null),esureAuthenticated,menuController.delete_menuItem_post)

// -----------------------------------------------------------------------
// ========= MENU CATEGORIES =========
// ***********************************

// -GET- request to --> '/menu/categories'
router.get('/categories/', esureAuthenticated,menuController.menuCategory_list)

// -GET- request to --> '/menu/category/:id'
router.get('/category/:id', esureAuthenticated,menuController.menuCategory_detail)

// -GET- request to --> '/menu/category/create'
router.get('/category/create',  permit("create", null),esureAuthenticated,menuController.create_menuCategory_get)

// -POST- request to --> '/menu/category/create'
router.post('/category/create',  permit("create", null),esureAuthenticated,menuController.create_menuCategory_post)

// -GET- request to --> '/menu/category/update'
router.get('/category/:id/update',  permit("update", null),esureAuthenticated,menuController.update_menuCategory_get)

// -POST- request to --> '/menu/category/update'
router.post('/category/:id/update',  permit("update", null),esureAuthenticated,menuController.update_menuCategory_post)

// -GET- request to --> '/menu/category/delete'
router.get('/category/:id/delete', permit("delete", null),esureAuthenticated,menuController.delete_menuCategory_get)

// -POST- request to --> '/menu/category/delete'
router.post('/category/:id/delete', permit("delete", null),esureAuthenticated,menuController.delete_menuCategory_post)



module.exports = router;
