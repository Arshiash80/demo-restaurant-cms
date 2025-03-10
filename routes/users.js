const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController")
const { esureAuthenticated } = require('../configs/passport/auth')
const passport = require('passport')
const bcrypt = require('bcryptjs');

const User = require('../models/users/User')
const Role = require('../models/users/Role')

const permit = require('../middlewares/authorization')

// -----------------------------------------------
// ======= USERS ROLE - /users/role =======
// -----------------------------------------------

// -GET- request to --> '/users/roles'
router.get('/roles', esureAuthenticated,usersController.userRole_list);

// -GET- request to --> '/users/role/create'
router.get('/role/create', permit(null, "create"),esureAuthenticated,usersController.create_userRole_get);

// -POST- request to --> '/users/role/create'
router.post('/role/create', permit(null, "create"),esureAuthenticated,usersController.create_userRole_post);

// -GET- request to --> '/users/role/:id'
router.get('/role/:id', esureAuthenticated,usersController.userRole_detail);

// -GET- request to --> '/users/role/:id/edit'
router.get('/role/:id/edit', permit(null, "update"),esureAuthenticated,usersController.edit_userRole_get);

// -POST- request to --> '/users/role/:id/edit'
router.post('/role/:id/edit', permit(null, "update"),esureAuthenticated,usersController.edit_userRole_post);

// -GET- request to --> '/users/role/:id/delete'
router.get('/role/:id/delete', permit(null, "delete"),esureAuthenticated,usersController.delete_userRole_get);

// -POST- request to --> '/users/role/:id/delete'
router.post('/role/:id/delete', permit(null, "delete"),esureAuthenticated,usersController.delete_userRole_post);


// -----------------------------------------------
// ======= USERS - /users =======
// -----------------------------------------------


// -GET- request to --> '/users'
router.get('/', esureAuthenticated,usersController.users_list);

// -GET- request to --> '/users/create'
router.get('/create', permit(null, "create"),esureAuthenticated,usersController.create_user_get);

// -POST- request to --> '/users/create'
router.post('/create', permit(null, "create"),esureAuthenticated,usersController.create_user_post);


// -GET- request to --> '/users/:id'
router.get('/:id', esureAuthenticated,usersController.users_detail);

// -GET- request to --> '/users/:id/edit'
router.get('/:id/edit', permit(null, "update"),esureAuthenticated,usersController.edit_user_get);

// -POST- request to --> '/users/:id/edit'
router.post('/:id/edit', permit(null, "update"),esureAuthenticated,usersController.edit_user_post);

// -GET- request to --> '/users/:id/delete'
router.get('/:id/delete', permit(null, "delete"),esureAuthenticated,usersController.delete_user_get);

// -POST- request to --> '/users/:id/delete'
router.post('/:id/delete', permit(null, "delete"),esureAuthenticated,usersController.delete_user_post);







module.exports = router;