'use strict';
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var Price = require('../db/models/Prices');
var Product = require('../db/models/Products');
var mongoose = require('mongoose');
var Types = mongoose.Types;
var helpers = require('./helpers/');
var userTemplate = require('../db/templates/userModelTemplate');
var userDataTemplate = require('../db/templates/userDataModelTemplate');
var connect = require('../db/connect');
var connection = connect();
var User = connection.model('users', userTemplate);
var UserData = connection.model('userDatas', userDataTemplate);


router.get('/', (req, res, next) => {
  console.log(req);
  if (!req.isAuthenticated()) {
    res.status(401).send({
      error: true,
      message: "User must be authenticated"
    });
    console.log('User not authenticated');
  } else {
    if (req.session.passport.user) {
      UserData.findOne({
        userId: req.session.passport.user
      }, (err, userData) => {
        if (err) {
          res.status(500).send(err);
          console.error('mongo error', err);
        } else {
          res.send(userData);
        }
      })
    } else {
      res.status(400).send({
        error: true,
        message: "Cannot find user's id in session"
      });
      console.error('Cannot get userid from session')
    }
  }
});

module.exports = router;
