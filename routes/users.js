const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController")
const { esureAuthenticated } = require('../configs/passport/auth')
const passport = require('passport')
const bcrypt = require('bcryptjs');

const User = require('../models/users/User')
const Role = require('../models/users/Role')


// -GET- request to --> '/users'
router.get('/', usersController.users_list);

// -GET- request to --> '/users/create'
router.get('/create', usersController.create_user_get);

// -POST- request to --> '/users/create'
router.post('/create', usersController.create_user_post);

// -GET- request to --> '/users/:id'
router.get('/:id', usersController.users_detail);

// -GET- request to --> '/users/:id/edit'
router.get('/:id/edit', usersController.edit_user_get);

// -POST- request to --> '/users/:id/edit'
router.post('/:id/edit', usersController.edit_user_post);

// -GET- request to --> '/users/:id/delete'
router.get('/:id/delete', usersController.delete_user_get);

// -POST- request to --> '/users/:id/delete'
router.post('/:id/delete', usersController.delete_user_post);


// -----------------------------------------------
// ======= USERS ROLE =======
// -----------------------------------------------

// -GET- request to --> '/users/roles'
router.get('/roles', usersController.userRole_list);

// -GET- request to --> '/users/role/:id'
router.get('/role/:id', usersController.userRole_detail);

// -GET- request to --> '/users/role/create'
router.get('/role/create', usersController.create_userRole_get);

// -POST- request to --> '/users/role/create'
router.post('/role/create', usersController.create_userRole_post);

// -GET- request to --> '/users/role/:id/edit'
router.get('/role/:id/edit', usersController.edit_userRole_get);

// -POST- request to --> '/users/role/:id/edit'
router.post('/role/:id/edit', usersController.edit_userRole_post);

// -GET- request to --> '/users/role/:id/delete'
router.get('/role/:id/delete', usersController.delete_userRole_get);

// -POST- request to --> '/users/role/:id/delete'
router.post('/role/:id/delete', usersController.delete_userRole_post);


module.exports = router;