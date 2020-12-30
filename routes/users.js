const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController")


// -GET- request to --> '/users'
router.get('/', usersController.users_list);

// -GET- request to --> '/users/:id'
router.get('/:id', usersController.users_detail);

// -GET- request to --> '/users/create'
router.get('/create', usersController.create_user_get);

// -POST- request to --> '/users/create'
router.post('/create', usersController.create_user_post);

// -GET- request to --> '/users/:id/edit'
router.get('/:id/edit', usersController.edit_user_get);

// -POST- request to --> '/users/:id/edit'
router.post('/:id/edit', usersController.edit_user_post);

// -GET- request to --> '/users/:id/delete'
router.get('/:id/delete', usersController.delete_user_get);

// -POST- request to --> '/users/:id/delete'
router.post('/:id/delete', usersController.delete_user_post);



module.exports = router;