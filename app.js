var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');


var app = express();

// Config .env variables
require('dotenv').config({ path: path.join(__dirname, 'configs/.env') })

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Init express-ejs-layouts
app.use(expressLayouts);


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
