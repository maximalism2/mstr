'use strict';
var express = require('express');
var router = express.Router();
var Price = require('../db/models/Prices');
var Product = require('../db/models/Products');
var Types = require('mongoose').Types;
var helpers = require('./helpers/');
var diff = require('deep-diff').diff;

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

router.get('/:id/', (req, res, next) => {
  //  Search the price, then looks for products, this links to this price,
  //  get them and put to product property in price object
  let id = Types.ObjectId(req.params.id);

  helpers.readById(req.params.id)
    .then(result => {
      res.json(JSON.stringify(result));
      res.end();
    })
    .catch(err => {
      res.writeHead(400);
      res.json(JSON.stringify(err));
      res.end();
    });
});

router.get('/', (req, res, next) => {
  Price.read()
    .then(result => {
      res.json(JSON.stringify(result));
      res.end();
    });
});

router.put('/:id/', (req, res, next) => {
  // At first we need to read price by id from request and do comparison
  // helpers.readById(:id);
  console.log('typeof params id', typeof req.params.id, String(req.params.id));
  const id = Types.ObjectId(req.params.id);

  let result = Price.readById(id);
  if (result.error) {
    console.log('result error', result);
  } else {
    result.then(price => {
      if (price !== null) {
        let priceCopy = JSON.parse(JSON.stringify(price));
        let query = {
          priceOrigin: id
        }

        return Product.readWhere(query)
          .then(ress => {
            let currentPrice = {
              price: priceCopy,
              products: ress
            };

            let newPrice = req.body;
            newPrice.updatedAt = new Date();

            let copyCurrentForMainComparison = JSON.parse(JSON.stringify(currentPrice.price));
            let copyNewForMainComparison = JSON.parse(JSON.stringify(newPrice));

            delete copyCurrentForMainComparison.products;
            delete copyNewForMainComparison.products;

            console.log('currentPrice', copyCurrentForMainComparison, 'newPrice', copyNewForMainComparison);
            let differenceBetweenPricesHeaders = diff(copyCurrentForMainComparison, copyNewForMainComparison);

            if (differenceBetweenPricesHeaders.length) {
              let id = copyNewForMainComparison._id;
              let body = {};
              differenceBetweenPricesHeaders.forEach(difference => {
                body = Object.assign({}, body, {
                  [difference.path[0]]: difference.rhs
                });
              });

              console.log('\n\n\nHeader for update', id, body);
              let headerUpdatingResult = Price.update(id, body);
              console.log('headerUpdatingResult', headerUpdatingResult);
              if (headerUpdatingResult.error) {
                console.log(headerUpdatingResult.error);
                res.json(JSON.stringify(headerUpdatingResult))
                res.end();
              }
              else {
                headerUpdatingResult
                  .then(result => console.log('header result => ', result))
                  .catch(err => console.log('header error =>', err));
              }
            }


            let differenceBetweenProducts = diff(JSON.parse(JSON.stringify(currentPrice.products)), newPrice.products);
            if (differenceBetweenProducts.length) {
              // Array for update products
              let prepareProductForUpdate = [];
              let alreadyFound_u = null; // already found for update
              let currentCheckingIndex_u = null; // checking index for update


              differenceBetweenProducts.forEach(difference => {
                if (difference.kind === 'E') {
                  // Checking only updated product
                  
                  // Here we parse difference between old and new arrays
                  if (currentCheckingIndex_u !== difference.path[0]) {
                    // It's for valid checking, is specific product already changed?
                    // Here we reset the index of changed product, where index in path (of difference)
                    // is also changed
                    alreadyFound_u = null;
                  } else {
                    // If it is some new index - use it
                    currentCheckingIndex_u = difference.path[0];
                  }

                  prepareProductForUpdate.forEach((alreadyPrepared, index) => {
                    // Here we looking for product, which is already changed and detected
                    // we check the _id field in products
                    if (alreadyFound_u !== null) return;
                    if (alreadyPrepared._id === newPrice.products[difference.path[0]]._id) {
                      alreadyFound_u = index;
                    }
                  });

                  if (alreadyFound_u !== null) {
                    let foundPrice = prepareProductForUpdate[alreadyFound_u];
                    prepareProductForUpdate[alreadyFound_u] = Object.assign({}, foundPrice, {
                      _id: newPrice.products[difference.path[0]]._id,
                      [difference.path[1]]: difference.rhs
                    });
                  } else {
                    prepareProductForUpdate.push({
                      _id: newPrice.products[difference.path[0]]._id,
                      [difference.path[1]]: difference.rhs
                    })
                  }
                }
              });

              console.log('\n\n\n\n', prepareProductForUpdate);
              // Updating needed products
              prepareProductForUpdate.forEach(product => {
                let productId = Types.ObjectId(product._id);
                let body = {};
                Object.keys(product).forEach(key => {
                  if (key !== "_id") {
                    if (key === "cost") {
                      body = Object.assign({}, body, {
                        [key]: Number(product[key])
                      });
                    } else {
                      body = Object.assign({}, body, {
                        [key]: String(product[key])
                      });
                    }
                  }
                });

                console.log(typeof productId, productId, body);
                let updatingRes = Product.update(productId, body);
                if (updatingRes.error) {
                  console.log('updatingError => ', updatingRes);
                  // res.whireHead(400);
                  // res.json(updatingRes);
                  res.end();
                  return;
                }
              });
            }

            res.end({ ok: true });
          });
      } else {
        res.end();
        return { error: 404 }
      }
    });
  }
  // let id = Types.ObjectId(req.params.id);
  // helpers.readById(id, true)
  //   .then(data => {
      
  //   })
  //   .catch((error) => {
  //     console.log('errorr', error);
  //     res.end();
  //   })

    res.end();
});

router.delete('/:id/', (req, res, next) => {
  // Here we need to remove single price and all products which have
  // the priceOrigin field equal price's id

  let id = req.params.id ? Types.ObjectId(req.params.id) : null;
  if (id === null) {
    res.json(JSON.stringify({error: 'must be not null'}));
    res.end();
    return;
  }

  let removingRes = Price.remove(id);

  if (removingRes.error) {
    res.json(JSON.stringify(removingRes.error));
  } else {
    removingRes.then(r => console.log('price', r));
    let productsRes = Product.removeWhere({ priceOrigin: id });
    if (productsRes.error) {
      res.json(JSON.stringify(productsRes.error));
    } else {
      productsRes.then(s => console.log("products", s));
      res.end(JSON.stringify({ok: true}));
    }
  }
  res.end();
})

module.exports = router;
