/**
 * Module exports function, which return database's
 * models prepared to using;
 */
'use strict';

const mongoose = require('mongoose');
const origin = 'localhost';
const dbName = 'maestro';
const Schema = mongoose.Schema;

const priceTemplate = require('./templates/priceModelTemplate');
const productTemplate = require('./templates/productModelTemplate');

const priceSchema = new Schema(priceTemplate);
const productSchema = new Schema(productTemplate);

function initdb() { // Initialize the database
  var connection = mongoose.createConnection(origin, dbName);
  const Price = connection.model('Prices', priceSchema);
  const Product = connection.model('Product', productSchema);

  return {
    Price: Price,
    Product: Product,
  }
}

module.exports = initdb;
