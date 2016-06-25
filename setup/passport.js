var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var userTemplate = require('../db/templates/userModelTemplate.js');
const Schema = require('mongoose').Schema;
var connect = require('../db/connect');
var connection = connect();
var User = connection.model('user', new Schema(userTemplate));


module.exports = function () {
  passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) {
        return done(err);
      } else {
        if (user) {
          if (password === user.password) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Incorrect password'});
          }
        } else {
          return done(null, false, {message: 'Incorrect username'});
        }
      }
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    });
  });
};