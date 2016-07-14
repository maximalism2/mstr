'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var pathToRegexp = require('path-to-regexp');
var compression = require('compression');
var passport = require('passport');
var passportInit = require('./setup/passport');
var isAuthenticated = require('./middlewares/isAuthenticated');

var routes = require('./routes/index');
var price = require('./routes/price');
var controllers = {
  login: require('./controllers/login'),
  register: require('./controllers/register'),
  logout: require('./controllers/logout'),
  checker: require('./controllers/checker')
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.svg')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded());
app.use(session({secret: 'SECRET'}));
app.use(compression());

// Passport:
app.use(passport.initialize());
app.use(passport.session());
passportInit();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/api/price', price);
app.post('/api/login', controllers.login);
app.get('/api/logout', controllers.logout);
app.use('/api/register', controllers.register);
app.post('/api/check', controllers.checker);
app.use('/api/logout', controllers.logout);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).sendFile(path.resolve(__dirname, './public/htmlsrc/home.html'));
  // next(err);
  // let pathToIndex = path.resolve(__dirname, '../public/index.html');
  // res.sendFile(pathToIndex);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
