'use strict';
var express = require('express');
var router = express.Router();
var Price = require('../db/models/Prices');
var Product = require('../db/models/Products');

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
  let result = Price.readById(req.params.id);
  if (result.error) {
    res.json(JSON.stringify(result));
    res.end();
  } else {
    result.then(price => {
      if (price) {
        let priceCopy = JSON.parse(JSON.stringify(price));
        let query = {
          priceOrigin: req.params.id
        }

        Product.readWhere(query)
        .then(result => {
          priceCopy.products = result;
          res.json(JSON.stringify(priceCopy));
          res.end();
        });
      } else {
        res.end();
      }
    });
  }
});

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
      let productsTemplates = copyOfProductsTemplates.map(item => {
        // originPrice, which is _id of created price
        return Object.assign({}, item, {
          priceOrigin: data._id
        });
      });

      const resultOfProducts = Product.createOf(productsTemplates);

      if (Array.isArray(resultOfProducts)) {
        let newPrice = JSON.parse(JSON.stringify(data));
        newPrice.products = resultOfProducts;
        let productsIds = resultOfProducts.map(product => product._id);
        let updatingResult = Price.update(newPrice._id, { products: productsIds });
        if (updatingResult.error) {
          console.log('\n\nerror\n\n', updatingResult);
        } else {
          updatingResult.then(someRes => {
            console.log('some res', someRes);
          })
        }
        res.json(JSON.stringify(newPrice));
        res.end();
      }  else if (resultOfProducts instanceof Object && resultOfProducts.error) {
        res.json(JSON.stringify(resultOfProducts));
        res.end();
      }
    });
  }
});

module.exports = router;
