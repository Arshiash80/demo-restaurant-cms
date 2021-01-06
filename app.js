const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session')
const flash = require('connect-flash')

const app = express();

// Config .env variables
require('dotenv').config({ path: path.join(__dirname, 'configs/.env') })

// Config passport.
const passport = require('passport')
require('./configs/passport/passport')(passport)

// Set up mongoose connection
let mongoose = require('mongoose')
let mongoDB = process.env.MONGODB_URI || process.env.DEV_DB_URI // DB config
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }) // Connect to Mongo
  .then(() => console.log('MongoDB Conected...'))
  .catch(err => {
    console.error("MongoDB connection error: ", err)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main_layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Init express-ejs-layouts
// Express session
app.use(session({
  secret: 'secret',
  resave: false, // t
  saveUninitialized: true, 
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // Equals to 1 day. 
}))
// Passport middleware.
app.use(passport.initialize());
app.use(passport.session());

// TODO: use this middleware to show contents according to users permissions.
// Current User Middleware.
const User = require('./models/users/User')
app.use(async function(req,res,next){ // This middleware shows the current user for every request.
  if (req.user) {
    await User.findById(req.user.id)
    .populate('role') // Populate users roles
    .exec(function(err, currentUser) {
      global.currentUser = currentUser;   
    })
  }
  next();
});

// Connect flash
app.use(flash());
// Global vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})



// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const menuRouter = require('./routes/menu');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', menuRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
