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
  template.products = [];
  const result = Price.create(template);

  console.log('\n\n Will create new price \n');

  if (result.error) {
    res.json(JSON.stringify(result));
    res.end();
  } else {

    result.then(data => {
      // Make the new array of products, but now we add the required property
      let productsTemplates = copyOfProductsTemplates.map(item => {
        // priceOrigin, which is _id of created price
        if (item._id) {
          delete item._id;
        }
        item.priceOrigin = data._id;
        return item;
      });

      console.log('\nproducts',  productsTemplates);

      const resultOfProducts = Product.createOf(productsTemplates);

      console.log('\nResult of products creating', resultOfProducts);

      if (Array.isArray(resultOfProducts)) {
        let newPrice = JSON.parse(JSON.stringify(data));
        newPrice.products = resultOfProducts;
        let productsIds = resultOfProducts.map(product => product._id);
        let updatingResult = Price.update(newPrice._id, { products: productsIds });
        if (updatingResult.error) {
          console.log('\n\nerror\n\n', updatingResult);
        } else {
          updatingResult.then(someRes => {
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
      res.statusCode(400);
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
  // we need to check is connection actual, if it's closed - remove all future
  // responses
  let needToResponse = true;

  const id = Types.ObjectId(req.params.id);

  let result = Price.readById(id);
  if (result.error) {
    if (needToResponse) {
      needToResponse = false; // Turn off the need to response
      console.log('error in search');
      res.json(JSON.stringify(result));
      res.end();
    }
  } else {
    result.then(price => {
      if (price !== null) {
        let priceCopy = JSON.parse(JSON.stringify(price));

        /*-------------------------------------\
        |       PRODUCTS REMOVING START        |
        \-------------------------------------*/
        let newPrice = req.body;
        newPrice.updatedAt = new Date();

        let currentIds = JSON.parse(JSON.stringify(priceCopy.products));
        let nextIds = newPrice.products.map(product => product._id);
        console.log(currentIds, nextIds);

        let arrayOfDeleted = currentIds.filter(id => nextIds.indexOf(id) === -1);
        let newArrayOfIdForPrice = currentIds.filter(id => arrayOfDeleted.indexOf(id) === -1);

        console.log('\nprev array', arrayOfDeleted, newArrayOfIdForPrice);

        if (arrayOfDeleted.length) {
          { // Updating header of the price
            let body = {
              products: newArrayOfIdForPrice
            }
            priceCopy.products = newArrayOfIdForPrice;

            let headerUpdatingResult = Price.update(String(id), body);
            
            if (headerUpdatingResult.error) {
              console.log('error when header was updating', headerUpdatingResult.error);
            } else {
              headerUpdatingResult
                .then(data => {
                  console.log('updated successfuly', data);
                })
                .catch(err => {
                  console.log('updating error when update products array', err);
                });
            }
          }

          { // Removing the products
            arrayOfDeleted.forEach(id => {
              id = Types.ObjectId(id);
              let resultOfRemoving = Product.remove(id);

              if (resultOfRemoving.error) {
                console.log('error when removing', resultOfRemoving.error);
              } else {
                resultOfRemoving
                  .then(data => {
                    console.log('product removed seccessfuly', data);
                  })
                  .catch(err => {
                    console.log('product removing error', err);
                  });
              }
            });
          }
        }
        /*-------------------------------------\
        |       PRODUCTS REMOVING END          |
        \-------------------------------------*/

        /*-------------------------------------\
        |        HEADER UPDATING START         |
        \-------------------------------------*/
        let copyCurrentHeader = JSON.parse(JSON.stringify(priceCopy));
        let copyNewHeader = JSON.parse(JSON.stringify(newPrice));

        delete copyCurrentHeader.products;
        delete copyNewHeader.products;

        let differenceBetweenPricesHeaders = diff(copyCurrentHeader, copyNewHeader);

        if (differenceBetweenPricesHeaders.length) {
          let id = copyNewHeader._id;
          let body = {};
          differenceBetweenPricesHeaders.forEach(difference => {
            body = Object.assign({}, body, {
              [difference.path[0]]: difference.rhs
            });
          });

          let headerUpdatingResult = Price.update(id, body);

          if (headerUpdatingResult.error) {
            if (needToResponse) {
              needToResponse = false; // Turn off the need to response
              console.log('headerUpdatingResult.error');
              res.json(JSON.stringify(headerUpdatingResult))
              res.end();
            }
          }
          else {
            headerUpdatingResult
              .then(result => {
                if (needToResponse) {
                  needToResponse = false; // Turn off the need to response
                  res.json(JSON.stringify(result));
                  res.end();
                }
              })
              .catch(err => {
                console.error('error', err)
                if (needToResponse) {
                  needToResponse = false; // Turn off the need to response
                  res.json(JSON.stringify(err));
                  res.end();
                }
              });
          }
        }
        /*-------------------------------------\
        |        HEADER UPDATING END           |
        \-------------------------------------*/


        /*-------------------------------------\
        |     PRODUCTS CREATING AND UPDATING   |
        |                 START                |
        \-------------------------------------*/
        Product.readWhere({ priceOrigin: id })
          .then(ress => {
            let currentProducts = JSON.parse(JSON.stringify(ress));
            let nextProducts = JSON.parse(JSON.stringify(newPrice.products));
            let differenceBetweenProducts = diff(currentProducts, nextProducts);
            console.log('lengths', currentProducts.length, nextProducts.length);
            console.log('differenceBetweenProducts', differenceBetweenProducts);
            if (differenceBetweenProducts.length) {
              { // There we updating the products of the price
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

                  let updatingRes = Product.update(productId, body);
                  if (updatingRes.error) {
                    console.log('updatingError => ', updatingRes);
                    if (needToResponse) {
                      needToResponse = false; // Turn off the need to response
                      res.json(JSON.stringify(updatingRes));
                      res.end();
                    }
                  }
                });
              }

              { // There we creating the new products
                let prepareProductForCreate = []
                differenceBetweenProducts.forEach(difference => {
                  if (difference.kind === 'A' && difference.item.kind === 'N') {
                    let newItem = difference.item.rhs;
                    delete newItem._id;
                    delete newItem.new;
                    newItem.priceOrigin = id;
                    prepareProductForCreate.push(newItem);
                  }
                });

                if (prepareProductForCreate.length) {
                  let resultOfCreating = Product.createOf(prepareProductForCreate);

                  if (Array.isArray(resultOfCreating)) {
                    let newPrice = JSON.parse(JSON.stringify(priceCopy));

                    let createdProductsIds = resultOfCreating.map(product => product._id);
                    let newProductsIds = newPrice.products.concat(createdProductsIds);

                    let updatingResult = Price.update(newPrice._id, {
                      products: newProductsIds
                    });

                    if (updatingResult.error) {
                      console.log('\n\nerror\n\n', updatingResult);
                    } else {
                      updatingResult.then(someRes => {
                      });
                    }
                    if (needToResponse) {
                      needToResponse = false;
                      res.json(JSON.stringify(newPrice));
                      res.end();
                    }
                  }  else if (resultOfCreating.error) {
                    console.log('creating products error', resultOfCreating);
                    if (needToResponse) {
                      needToResponse = false;
                      res.json(JSON.stringify(resultOfCreating));
                      res.end();
                    }
                  }
                }
              }
            }
          });
        /*-------------------------------------\
        |     PRODUCTS CREATING AND UPDATING   |
        |                  END                 |
        \-------------------------------------*/

      } else {
        console.log('some wrong in this?');
        res.json({
          error: "Price not found",
          code: 404
        });
        res.end();
      }
    });
  }
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
