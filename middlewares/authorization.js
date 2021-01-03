const User = require("../models/users/User")
// middleware for doing role-based permissions
module.exports = function permit(menu_permission, user_permission) {
    // return a middleware
    return (req, res, next) => {
        if (req.user) {
            User.findById(req.user.id)
            .populate('role')
            .exec(function(err, user) {
                if (err) {
                    next(err)
                }
                else if (user && (user.role.permissions.menu_permissions.includes(menu_permission) || menu_permission === null ) && (user.role.permissions.user_permissions.includes(user_permission)) || user_permission === null) {
                    next(); // role is allowed, so continue on the next middleware
                } else {
                    req.flash("error_msg", "Sorry! Yo dont have permission to do that.")
                    res.redirect('/')
                    // res.status(403).json({message: "Forbidden"}); // user is forbidden
                }
            })
        } else {
            next()
        }
        
    }
  }