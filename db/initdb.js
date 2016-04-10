const mongoose = require('mongoose');
const origin = 'localhost';
const dbName = 'maestro';
const Schema = mongoose.Schema;

const priceSchema = require('./priceModelTemplate');
const productSchema = require('./productModelTemplate');

function initdb() { // Initialize the database
  var connection = mongoose.createConnection(origin, dbName);
  const Price = connection.model('Prices', new Schema(priceSchema));
  const Product = connection.model('Product', new Schema(productSchema));

  return {
    Price: Price,
    Product: Product,
  }
}

module.exports = initdb;
