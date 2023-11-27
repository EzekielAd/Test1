let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var router = express.Router();

let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');
//creating a user model instance
let userModel = require('../models/user');
let User=userModel.User;
//mongoose.connect('mongodb://127.0.0.1:27017/watchlist Lib');
mongoose.connect(DB.URI);
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Mongo DB is connected")});
//mongoose.connect(DB.URI);


//set up express session
app.use(session({
 secret: "SomeSecret",
 saveUninitialized:false, 
  resave:false
}));

//initialize flash
app.use(flash());

//initialize the passport
app.use(passport.initialize());
app.use(passport.session());

//serialization and deserialization of the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//call the Strategy
passport.use(User.createStrategy());
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let showsRouter = require('../routes/Bio_show');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/showslist', showsRouter);

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
  res.render('error',{title:'Error'});
});

module.exports = app;
