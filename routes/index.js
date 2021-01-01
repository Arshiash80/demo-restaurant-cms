const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController')

const { esureAuthenticated } = require('../configs/passport/auth')

const passport = require('passport')
const bcrypt = require('bcryptjs');

const User = require('../models/users/User')
const Role = require('../models/users/Role')

// -GET- request to --> '/'
router.get('/', indexController.index);

// -GET- request to --> '/login'
router.get('/login', indexController.login_get);

// -POST- request to --> '/login'
router.post('/login', indexController.login_post);

// -GET- request to --> '/logout'
router.get('/logout', indexController.logout_get);

// -POST- request to --> '/logout'
router.post('/logout', indexController.logout_post);



module.exports = router;
