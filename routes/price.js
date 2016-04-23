'use strict';
var express = require('express');
var router = express.Router();
var Price = require('../db/models/Prices');
var Product = require('../db/models/Products');

router.post('/', (req, res, next) => {
  // Make copy of request body
  const template = JSON.parse(JSON.stringify(req.body));
  // Make copy of products (in the future they can be deleted)
  const copyOfProductsTemplates = JSON.parse(JSON.stringify(template.products));

  const result = Price.create(template);

  if (result.error) {
    res.json(JSON.stringify(result));
    res.end();
  } else {

    result.then(data => {
      // Make the new array of products, but now we add the required property
      // originPrice, which is _id of created price
      let productsTemplates = copyOfProductsTemplates.map(item => {
        return Object.assign({}, item, {
          priceOrigin: data._id
        });
      });

      const resultOfProducts = Product.createOf(productsTemplates);

      if (Array.isArray(resultOfProducts)) {
        let newPrice = JSON.parse(JSON.stringify(data));
        newPrice.products = resultOfProducts;
        let productsIds = resultOfProducts.map(product => product._id);
        Price.update(newPrice._id, { products: productsIds });
        res.json(JSON.stringify(newPrice));
        res.end();
      }  else if (resultOfProducts instanceof Object && resultOfProducts.error) {
        res.json(JSON.stringify(resultOfProducts));
        res.end();
      }
    });
  }
});

router.get('/', (req, res, next) => {
  Price.read()
    .then(result => {
      res.json(JSON.stringify(result));
      res.end();
    })
});

router.get('/:id/', (req, res, next) => {
  //  Search the price, then looks for products, this links to this price,
  //  get them and put to product property in price object
  Price.readById(req.params.id)
    .then(result => {
      if (result) {
        let price = result;
        let query = {
          priceOrigin: req.params.id
        }
        console.log(`\n Price => `, JSON.stringify(price), query);

        Product.readWhere(query)
        .then(result => {
          console.log('result =>', result);
          price.products = result;
          res.json(JSON.stringify(price));
          res.end();
        });
      } else {
        res.end();
      }
    });
});

module.exports = router;
