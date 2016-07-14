var userTemplate = require('../db/templates/userModelTemplate.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connect = require('../db/connect');
const connection = connect();
var User = connection.model('user', new Schema(userTemplate));

module.exports = function(req, res, next) {
  req.on('data', chunk => {
    const requestBody = JSON.parse(chunk.toString('utf8'));
    if (requestBody.field === 'username') {
      User.find({
        username: requestBody.value
      }, (err, users) => {
        if (err) {
          res.status(400).send({
            error: true,
            message: err
          })
          console.log('error in checking', err);
        } else {
          res.send({
            isUnique: !users.length
          });
        }
      });
    } else {
      res.status(500).send({
        error: true,
        message: `Field ${requestBody.field} still cannot be checked`
      });
    }
  })
}