'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
// router.get(/(\/|\/price\/|\/prices\/|\/prices\/new\/)/, function(req, res, next) {
router.get('/', function(req, res, next) {
  let pathToIndex = path.resolve(__dirname, '../public/index.html');
  res.sendFile(pathToIndex);
});

module.exports = router;
