'use strict';
var express = require('express');
var router = express.Router();
var Price = require('../db/models/Prices');

router.post('/', (req, res, next) => {
  req.on('error', err => { console.error(err); });

  req.on('data', (chunk, we, fe) => {
    let template = JSON.parse(chunk.toString());
    console.log('TEMPLATE => ', template);
    let result = Price.create(template);
    if (result.error) {
      res.json(JSON.stringify(result));
      res.end();
    } else {
      result.then(createdPrice => {
        res.json(JSON.stringify(createdPrice));
        res.end();
      })
    }
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
