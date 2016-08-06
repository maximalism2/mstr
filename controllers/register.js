var userTemplate = require('../db/templates/userModelTemplate.js');
var userDataTemplate = require('../db/templates/userDataModelTemplate.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connect = require('../db/connect');
const connection = connect();
var User = connection.model('user', new Schema(userTemplate));
var UserData = connection.model('userData', new Schema(userDataTemplate));

// End of dependencies.


module.exports = function(req, res, next) {
  req.on('data', chunk => {
    var data = JSON.parse(chunk.toString('utf8'));
    var user = new User({ username: data.username, password: data.password});
    user.save(userSaveError => {
      if (userSaveError) {
        res.status(500).send({message: 'Cannot create new user', error: userSaveError});
        console.log('error when save user', userSaveError);
      }

      let newUserData = new UserData({
        userId: user._id,
        email: data.email
      });

      newUserData.save(userDataSaveError => {
        if (userDataSaveError) {
          res.status(500).send({ message: 'Cannot create userData document', error: userDataSaveError});
          console.log('error when user data saving', userDataSaveError);
        }

        req.login(user, err => {
          if (err) {
            res.status(500).send({message: 'Cannot login new user'});
            console.log('Error when login', err);
          }
          res.send({
            success: true,
            user: user,
            userData: newUserData
          });
        });
      });
    });
  });
};