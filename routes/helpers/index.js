'use strict';
const Types = require('mongoose').Types;
const Price = require('../../db/models/Prices');
const Product = require('../../db/models/Products');

function readById(id, willReturnChunks) {
  console.log('before', typeof id, id)
  id = Types.ObjectId(id);
  console.log('after', typeof id, id)

  let result = Price.readById(id);
  if (result.error) {
    console.log('result error', result);
    return result;
  } else {
    return result.then(price => {
      if (price !== null) {
        let priceCopy = JSON.parse(JSON.stringify(price));
        let query = {
          priceOrigin: id
        }

        return Product.readWhere(query)
          .then(result => {
            if (willReturnChunks) {
              return {
                price: priceCopy,
                products: result
              }
            } else {
              priceCopy.products = result;
              return priceCopy;
            }
          });
      } else {
        return { error: 404 }
      }
    });
  }
}

module.exports = {
  readById: readById
}