const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuController')

// -----------------------------------------------------------------------
// ========= MENU ITEMS =========
// ******************************

// -GET- request to --> '/menu/items'
router.get('/items/', menuController.menuItem_list)

// -GET- request to --> '/menu/item/:id'
router.get('/item/:id', menuController.menuItem_detail)

// -GET- request to --> '/menu/item/create'
router.get('/item/create', menuController.create_menuItem_get)

// -POST- request to --> '/menu/item/create'
router.post('/item/create', menuController.create_menuItem_post)

// -GET- request to --> '/menu/item/update'
router.get('/item/:id/update', menuController.update_menuItem_get)

// -POST- request to --> '/menu/item/update'
router.post('/item/:id/update', menuController.update_menuItem_post)

// -GET- request to --> '/menu/item/delete'
router.get('/item/:id/delete', menuController.delete_menuItem_get)

// -POST- request to --> '/menu/item/delete'
router.post('/item/:id/delete', menuController.delete_menuItem_post)

// -----------------------------------------------------------------------
// ========= MENU CATEGORIES =========
// ***********************************

// -GET- request to --> '/menu/categories'
router.get('/categories/', menuController.menuCategory_list)

// -GET- request to --> '/menu/category/:id'
router.get('/category/:id', menuController.menuCategory_detail)

// -GET- request to --> '/menu/category/create'
router.get('/category/create', menuController.create_menuCategory_get)

// -POST- request to --> '/menu/category/create'
router.post('/category/create', menuController.create_menuCategory_post)

// -GET- request to --> '/menu/category/update'
router.get('/category/:id/update', menuController.update_menuCategory_get)

// -POST- request to --> '/menu/category/update'
router.post('/category/:id/update', menuController.update_menuCategory_post)

// -GET- request to --> '/menu/category/delete'
router.get('/category/:id/delete', menuController.delete_menuCategory_get)

// -POST- request to --> '/menu/category/delete'
router.post('/category/:id/delete', menuController.delete_menuCategory_post)



module.exports = router;
