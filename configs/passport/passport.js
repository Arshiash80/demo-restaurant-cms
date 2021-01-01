const LocalStrategy = require('passport-local').Strategy 
const bcrypt = require('bcryptjs')

// Loadn User model.
const User = require('../../models/users/User')

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username!' });
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) { done(err) }
    
              if (isMatch) {
                return done(null, user)
              } else {      
                return done(null, false, { message: "Incorrect password!" })          
              }    
          })
            
          }
          
        });
      }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}