var userTemplate = require('../db/templates/userModelTemplate.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connect = require('../db/connect');
const connection = connect();
var User = connection.model('user', new Schema(userTemplate));

// End of dependencies.


module.exports = function(req, res, next) {
  var user = new User({ username: req.body.username, password: req.body.password});
  console.log('\n\n\n');
  console.log(user);
  user.save(function(err) {
    console.log('may be error');
    console.log(err);
    console.log('error is above');
    return err
      ? next(err)
      : req.login(user, function(err) {
        console.log(err);
        return err
          ? next(err)
          : res.redirect('/');
      });
  });
};