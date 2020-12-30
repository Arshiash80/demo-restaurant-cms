const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuController')

// -GET- request to --> '/menu'
router.get('/', menuController.menuItems_list)

// -GET- request to --> '/menu/:id'
router.get('/:id', menuController.menuItems_detail)

// -GET- request to --> '/menu/create'
router.get('/create', menuController.create_menuItem_get)

// -POST- request to --> '/menu/create'
router.post('/create', menuController.create_menuItem_post)

// -GET- request to --> '/menu/update'
router.get('/:id/update', menuController.update_menuItem_get)

// -POST- request to --> '/menu/update'
router.post('/:id/update', menuController.update_menuItem_post)

// -GET- request to --> '/menu/delete'
router.get('/:id/delete', menuController.delete_menuItem_get)

// -POST- request to --> '/menu/delete'
router.post('/:id/delete', menuController.delete_menuItem_post)



module.exports = router;
