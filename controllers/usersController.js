const User = require('../models/users/User')
const Role = require('../models/users/Role')
const async = require('async')

const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

// <-----|| 'LIST', 'DETAIL' ||-----> //

// @route   GET - '/users'.
// @desc    List all users.
exports.users_list = (req, res, next) => {
    function compare( a, b ) {
        if ( a.role.name < b.role.name ){
          return -1;
        }
        if ( a.role.name > b.role.name ){
          return 1;
        }
        return 0;
    }
    
    User.find().populate('role').exec((err, users) => {
        res.render("users_list", { users: users.sort(compare) })
    })
}

// @route   GET - '/users/:id'.
// @desc    Render a detail page for specific user.
exports.users_detail = (req, res, next) => {
    const id = req.params.id
    User.findById(id).populate('role').exec((err, user) => {
        if (err) { return next(err) }
        if (user) {
            res.render("user_detail", { title: "User Detail", user: user })
        } else {
            req.flash("warning_msg", "<span class='fw-bold'>User not found!</span>")
            res.redirect("/users")
        }
    })
}


// <-----|| 'CREATE', 'EDIT', 'DELETE' ||-----> //


// @route   GET - '/users/create'.
// @desc    Render user create page.
exports.create_user_get = (req, res, next) => {
    async.parallel({
        roles: (callback) => {
            Role.find().exec(callback)
        }
    }, (err, results) => {
        if (err) { return next(err) }
        res.render("create_user_form", { title: "Create A New User", roles: results.roles })
    })
}
// @route   POST - '/users/create'.
// @desc    Handle user create form.
exports.create_user_post = [
    // Validate and sanitise fieldss.
    body('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters")
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers.')
        .escape(),

    body('password')
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters!")
        .escape()
        .custom((value,{req, loc, path}) => { // Check's if confirmPassword is equal to password.
        if (value !== req.body.confirmPassword) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match!");
        } else {
            return value;
        }}),
    body('role')
        .custom((value, {req, loc, path}) => { // Check's if roles value equals to 0 or not
         if (value === '0') {
            throw new Error("Please select a role!");
         } else {
            return value;
         }
        }),
        

        // Process request after validation and sanitization.
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                async.parallel({
                    roles: (callback) => {
                        Role.find().exec(callback)
                    }
                }, (err, results) => {
                    if (err) { return next(err) }
                    res.render('create_user_form', { title: "Create A New User", roles: results.roles , user: req.body, errors: errors.array()})
                    return
                })
            } else {
                // There is no error. Data from form is valid.
                let newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role
                })
                // Secure the password with bcryptjs
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err) { return next(err) }
                        // Store hash in your password DB.
                        newUser.password = hash
                        // Check the User is exists.
                        User.findOne({ username: newUser.username })
                            .then(user => {
                                if (user) {
                                    async.parallel({
                                        roles: (callback) => {
                                            Role.find().exec(callback)
                                        }
                                    }, (err, results) => {
                                        if (err) { return next(err) }
                                        errors.errors.push({
                                            value: newUser.username,
                                            msg: `Another user is using the <span class="text-primary">"${newUser.username}"</span> username.`,
                                            param: 'username',
                                            location: 'body'
                                        })
                                        res.render('create_user_form', { title: "Create A New User", roles: results.roles , user: req.body, errors: errors.array()})
                                        return
                                    })    
                                } else {
                                    // User not exists. So it's good to go!
                                    // Save the new user into db.
                                    newUser.save(err => {
                                        if (err) { return next(err) }
                                        // Successful - Redirect to users page.
                                        res.redirect('/users')
                                    })
                                }
                            })
                    });
                });
            }
        }

 
]

// @route   GET - '/users/:id/edit'.
// @desc    Render user edit page.
exports.edit_user_get = (req, res, next) => {
    const id = req.params.id
    if (id !== req.user.id) {
        async.parallel({
            user: (callback) => {
                User.findById(id).populate('role').exec(callback)
            },
            roles: (callback) => {
                Role.find().exec(callback)
            }
        }, (err, results) => {
            if (err) { return next(err) }
            // No errors - So render.
            if (results.user) {
                res.render('edit_user_form', { title: "Edit User", user: results.user, roles: results.roles })
            } else {
                req.flash("warning_msg", "User not found!")
                res.redirect('/users')
            }
        })   
    } else {
        req.flash('warning_msg', "You can't edit youre own account.")
        res.redirect('/')
    }    
}
// @route   POST - '/users/:id/edit'.
// @desc    Handle user edit form.
exports.edit_user_post = [
    // Validate and sanitise fieldss.
    body('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters")
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers.')
        .escape(),

    body('role')
        .custom((value, {req, loc, path}) => { // Check's if roles value equals to 0 or not
         if (value === '0') {
            throw new Error("Please select a role!");
         } else {
            return value;
         }
        }),

    // Process request after validation and sanitization.
    (req, res, next) => {
        const id = req.params.id
        if (id !== req.user.id) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                async.parallel({
                    user: (callback) => {
                        User.findById(id).populate('role').exec(callback)
                    },
                    roles: (callback) => {
                        Role.find().exec(callback)
                    }
                }, (err, results) => {
                    if (err) { return next(err) }
                    res.render('edit_user_form', { title: "Edit User", user: results.user, roles: results.roles, errors: errors.array() })
                    return
                })
            } else {
                // There is no error. Data from form is valid.
                let newUser = {
                    username: req.body.username ,
                    role: req.body.role
                }
                User.findById(id).exec((err, user) => {
                    if (newUser.username !== user.username) {
                        // Check the User is exists.
                        User.findOne({ username: newUser.username })
                        .then(user => {
                            if (user) {
                                async.parallel({
                                    user: (callback) => {
                                        User.findById(id).populate('role').exec(callback)
                                    },
                                    roles: (callback) => {
                                        Role.find().exec(callback)
                                    }
                                }, (err, results) => {
                                    if (err) { return next(err) }
                                    errors.errors.push({
                                        value: newUser.username,
                                        msg: `Another user is using the <span class="text-primary">"${newUser.username}"</span> username.`,
                                        param: 'username',
                                        location: 'body'
                                    })
                                    res.render('edit_user_form', { title: "Edit User", user: results.user, roles: results.roles, errors: errors.array() })
                                    return
                                })    
                            } else {
                                // User not exists. So it's good to go!
                                // Update the user.
                                User.findByIdAndUpdate(req.params.id, newUser, {}, function (err, user) {
                                    if (err) { return next(err); }
                                    // Successful - redirect to user detail page.
                                    res.redirect(user.url);
                                    });
                                }
                        })
                    } else {
                        User.findByIdAndUpdate(req.params.id, newUser, {}, function (err, user) {
                            if (err) { return next(err); }
                            // Successful - redirect to user detail page.
                            req.flash("success_msg", "User's information has been updated successfully")
                            res.redirect(user.url);
                        });
                    }
    
                })
                
            }
        } else {
            req.flash('warning_msg', "You can't edit youre own account.")
            res.redirect('/')
        }
    }

 
]

// @route   GET - '/users/:id/delete'.
// @desc    Render user delete page.
exports.delete_user_get = (req, res, next) => {
    const id = req.params.id
    if (id !== req.user.id) { 
        User.findById(id).populate('role').exec((err, user) => {
            if (err) { return next(err) }
            // No errors. So render.
            res.render('delete_user', { title: "Delete User", user: user })
        })
    } else {
        req.flash('warning_msg', "You can't delete youre own account.")
        res.redirect('/')
    }
}
// @route   POST - '/users/:id/delete'.
// @desc    Handle user delete form.
exports.delete_user_post = (req, res, next) => {
    const id = req.params.id
    if (id !== req.user.id) {
        User.findByIdAndRemove(id, (err) => {
            if (err) { return next(err) }
            // Success. Go to Books list.
            res.redirect('/users')
        })
    } else {
        req.flash('warning_msg', "You can't delete youre own account.")
        res.redirect('/')
    }
    
}

// -----------------------------------------------
// ======= USERS ROLE =======
// -----------------------------------------------

// @route   GET - '/users/roles'.
// @desc    List all roles.
exports.userRole_list = (req, res, next) => {
    Role.find().exec((err, roles) => {
        res.render('roles_list', { title: "Roles List", roles: roles })
    })
}

// @route   GET - '/users/role/:id'.
// @desc    Render a detail page for specific role.
exports.userRole_detail = (req, res, next) => {
    const id = req.params.id

    async.parallel({
        users: (callback) => {
            User.find({ 'role': id }).populate('role').exec(callback)
        },
        role: (callback) => {
            Role.findById(id).exec(callback)
        }
    }, (err, results) => {
        if (err) { return next(err) }
        // No errors. So render.
        res.render("role_detail", {  title: "Role Detail", users: results.users, role: results.role })
    })
}


// <-----|| 'CREATE', 'EDIT', 'DELETE' ||-----> //


// @route   GET - '/users/role/create'.
// @desc    Render role create page.
exports.create_userRole_get = (req, res, next) => {
    res.render("create_role_form", { title: "Create A New Role" })
}
// @route   POST - '/users/role/create'.
// @desc    Handle role create form.
exports.create_userRole_post = [
    body('name')
        .trim()
        .isLength({ min: 1 })
        .withMessage("A name required for role!")
        .isLength({ min: 3 })
        .withMessage("Role name must be at least 3 characters.")
        .isAlpha()
        .withMessage('Role name must contains only letters.')
        .escape(),

    body('menuPermission')
        .isArray()
        .withMessage("You must mark at least one of the menu permissions."),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("create_role_form", { title: "Create A New Role", errors: errors.array() })
        } else {
            // There is no error. Data from form is valid.
            let newRole = new Role({
                name: req.body.name,
                permissions: {
                    menu_permissions: req.body.menuPermission,
                    user_permissions: req.body.userPermission
                }
            })
            Role.findOne({ name: newRole.name })
                .then(result => {
                    if (result) {
                        errors.errors.push({
                            value: newRole.name,
                            msg: `'${newRole.name}' Role name is already taken.`,
                            param: 'name',
                            location: 'body'
                        })
                        res.render("create_role_form", { title: "Create A New Role", errors: errors.array() })

                    } else {
                        newRole.save(err => {
                            if (err) { return next(err) }
                            res.redirect('/users/roles')
                        })
                    }
                })
        }
    }
]

// @route   GET - '/users/role/:id/edit'.
// @desc    Render role edit page.
exports.edit_userRole_get = (req, res, next) => {
    const id = req.params.id
    if (id != req.user.role) {
        async.parallel({
            role_users: (callback) => {
                User.find({ 'role': id }).exec(callback)
            },
            role: (callback) => {
                Role.findById(id).exec(callback)
            }
        }, (err, results) => {
            if (err) { return next(err) }
            // No errors. So render.
            res.render('edit_role_form', { title: "Edit Role", role_users: results.role_users, role: results.role })
        })
    } else {
        req.flash('warning_msg', "You can't edit youre own role!")
        res.redirect('/users/roles')
    }
    
}
// @route   POST - '/users/role/:id/edit'.
// @desc    Handle role edit form.
exports.edit_userRole_post = [
    body('name')
        .trim()
        .isLength({ min: 1 })
        .withMessage("A name required for role!")
        .isLength({ min: 3 })
        .withMessage("Role name must be at least 3 characters.")
        .isAlpha()
        .withMessage('Role name must contains only letters.')
        .escape(),

    body('menuPermission')
        .isArray()
        .withMessage("You must mark at least one of the menu permissions."),

    (req, res, next) => {
        if (req.params.id != req.user.role) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                async.parallel({
                    role_users: (callback) => {
                        User.find({ 'role': req.params.id }).exec(callback)
                    },
                    role: (callback) => {
                        Role.findById(req.params.id).exec(callback)
                    }
                }, (err, results) => {
                    if (err) { return next(err) }
                    // No errors. So render.
                    res.render('edit_role_form', { title: "Edit Role", role_users: results.role_users, role: results.role, errors: errors.array() })
                })
            } else {
                // Form data is valid.
                Role.findById(req.params.id).exec((err, oldRole) => {
                    if (err) { return next(err) }
                    // No errors.
                    let newRole = {
                        // DATA FROM "edit_role_form" FORM.
                        name: req.body.name,
                        permissions: {
                            menu_permissions: req.body.menuPermission || [],
                            user_permissions: req.body.userPermission || []
                        }
                    }
                    if (oldRole.name !== newRole.name) {
                        Role.findOne({ 'name': newRole.name }).exec((err, role) => {
                            if (err) { return next(err) }
                            // No errors.
                            if (role) {
                                // This role name is exists. Rerender the page with error value.
                                errors.errors.push({
                                    value: newRole.name,
                                    msg: `'${newRole.name}' Role name is already taken.`,
                                    param: 'name',
                                    location: 'body'
                                })
                                async.parallel({
                                    role_users: (callback) => {
                                        User.find({ 'role': req.params.id }).exec(callback)
                                    },
                                    role: (callback) => {
                                        Role.findById(req.params.id).exec(callback)
                                    }
                                }, (err, results) => {
                                    if (err) { return next(err) }
                                    // No errors. So render.
                                    res.render('edit_role_form', { title: "Edit Role", role_users: results.role_users, role: results.role, errors: errors.array() })
                                })
                            } else {
                                // Role name is ok. So update the roles detail and redirect to role detail page.
                                Role.findByIdAndUpdate(req.params.id, newRole, {}, function (err, role) {
                                    if (err) { return next(err); }
                                    // Successful - redirect to role detail page.
                                    req.flash("success_msg", "Role's information has been updated successfully")
                                    res.redirect(role.url);
                                });
                            }
                        })
                    } else {
                        Role.findByIdAndUpdate(req.params.id, newRole, {}, function (err, role) {
                            if (err) { return next(err); }
                            // Successful - redirect to role detail page.
                            req.flash("success_msg", "Role's information has been updated successfully")
                            res.redirect(role.url);
                        });
                    }
                })
            }
        } else {
            req.flash('warnind_msg', "You can't edit youre own role!")
            res.redirect('/users/roles')
        }
        
    }
]

// @route   GET - '/users/role/:id/delete'.
// @desc    Render role delete page.
exports.delete_userRole_get = (req, res, next) => {
    const id = req.params.id
    if (id != req.user.role) { 
        async.parallel({
            users: (callback) =>{
                User.find({ 'role': id }).exec(callback)
            },
            role: (callback) => {
                Role.findById(id).exec(callback)
            }
        }, (err, results) => {
            if (err) { return next(err) }
            // No errors.
            res.render('delete_role', { title: "Delete Role", role: results.role, users: results.users })
        })
        
    } else {
        req.flash('warning_msg', "You can't delete youre own role!")
        res.redirect('/users/roles')
    }
}
// @route   POST - '/users/role/:id/delete'.
// @desc    Handle role delete form.
exports.delete_userRole_post = (req, res, next) => {
    const id = req.params.id
    if (id != req.user.role) { 
        async.parallel({
            users: (callback) => {
                User.find({ 'role': id }).exec(callback)
            },
            role: (callback) => {
                Role.findById(id).exec(callback)
            } 
        }, (err, results) => {
            if (err) { return next(err) }
            // No erros.
            Role.findByIdAndRemove(results.role.id, (err, role) => {
                if (err) return next(err)
                results.users.forEach(user => {
                    User.findByIdAndRemove(user.id, err => {
                        if (err) return next(err)
                    })
                })
                req.flash("success_msg", `Role named: "${role.name}" was delted successfuly including the users who used it.`)
                res.redirect('/users/roles')
            })
            
        })
        
    } else {
        req.flash('warning_msg', "You can't delete youre own role!")
        res.redirect('/users/roles')
    }
}