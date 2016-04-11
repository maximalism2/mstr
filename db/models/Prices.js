/**
 * Module exports custom interface for database's model Price;
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect = require('../connect');
var template = require('../templates/priceModelTemplate');

const connection = connect();
var priceSchema = new Schema(template);

var Price = connection.model('Prices', priceSchema);

function create(instance) {
  if (arguments.length === 0) {
    // If parameters are not passed
    throw new Error('Method expects a parameter, but no one was passed');
    return false;
  }
  if (!(instance instanceof Object)) {
    // If instance is not object
    throw new Error('Instance must be an Object');
    return false;
  } else if (Object.keys(instance).length === 0) {
    // If instance object has no propertys
    throw new Error('Cannot create empty instance');
    return false;
  } else if (!instance.hasOwnProperty('name')) {
    // If instance has no property name
    throw new Error('Instance must have the \'name\' property');
    return false;
  } else if (typeof instance.name !== 'string') {
    // If name is not a string
    throw new Error('instance.name must be a string');
    return false;
  } else if (instance.name.length === 0) {
    // If instance.name is empty string
    throw new Error('instance.name cannot be ""');
    return false;
  } else if (instance.name.length > 200) {
    // If instance.name is longer than 200 characters
    throw new Error('instance.name cannot be longer than 200 characters');
    return false;
  }

  if (!instance.discount) {
    // If discount is undefined, let it be 0
    instance.discount = 0;
  }
  if (instance.products && instance.products.length > 0) {
    // Clear the array of products, if it is exist
    instance.products = [];
  }

  // Set priceId in instance
  instance.priceId = new mongoose.mongo.ObjectId();
  // Set date of last updating
  instance.updatedAt = Date.parse(new Date());

  // Create the new copy of model's instance
  var copy = new Price(instance);

  // Save it async and return promise of result
  return copy.save();
}

const Interface = {
  create: create
};

module.exports = Interface;
