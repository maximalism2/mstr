var express = require('express');
var router = express.Router();
var Price = require('../db/models/Prices');

router.post('/', function(req, res, next) {
  console.log(req, req.body);

  var body = "";
  req.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body += chunk;
  }).on('end', function() {
    res.end();
  });
});

router.get('/', function(req, res, next) {
  Price.read()
    .then(result => {
      res.json(JSON.stringify(result));
      res.end();
    })
});

router.get('/:id/', function(req, res, next) {
  Price.readById(req.params.id)
    .then(result => {
      res.json(JSON.stringify(result));
      res.end();
    })
});

module.exports = router;
