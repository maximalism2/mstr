/**
 * Module exports custom interface for database's model Price;
 * The interface includes methods:
 *
 * - 'create', which expects an object consists of:
 *      name - String. Price name. Is required.
 *      discount - Number. Value of discount for created Price. Option.
 *      products - Array of ObjectId. Array which consists of product's id. Option.
 *    returned promise with result if success, and false if creating fail;
 *
 * - 'read', which does not expect any parameters.
 *    returned promise with result;
 *
 * - 'readById', which expects one parameter, it is a string;
 *    returned promise with result if success, and false if fail;
 *
 * - 'update', which expects two parameters, a 'id' - string, and 'query' - object
 * consists one of:
 *       name - String.
 *       discount - Number.
 *       products - Array
 *    returned promise with result is success, and false if query is not valid;
 *
 * - 'remove', which expects string with id
 *    returned promise with result;
 *
 *  TODO
 *    - 'readWhere' method, which will expect an object with vanilla mongodb query
 *    - 'createOf' method, which will expect an array of objects of Prices (multiple creating)
 */
'use strict';

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
    let message = 'Method expects a parameter, but no one was passed';
    return { error: message };
  } else if (!(instance instanceof Object)) {
    // If instance is not object
    let message = 'Instance must be an Object';
    return { error: message };
  } else if (Object.keys(instance).length === 0) {
    // If instance object has no propertys
    let message = 'Cannot create empty instance';
    return { error: message };
  } else if (!instance.hasOwnProperty('name')) {
    // If instance has no property name
    let message = 'Instance must have the \'name\' property';
    return { error: message };
  } else if (typeof instance.name !== 'string') {
    // If name is not a string
    let message = 'instance.name must be a string';
    return { error: message };
  } else if (instance.name.length === 0) {
    // If instance.name is empty string
    let message = 'instance.name cannot be ""';
    return { error: message };
  } else if (instance.name.length > 200) {
    // If instance.name is longer than 200 characters
    let message = 'instance.name cannot be longer than 200 characters';
    return { error: message };
  }

  if (!instance.discount) {
    // If discount is undefined, let it be 0
    instance.discount = 0;
  }
  if (instance.products && instance.products.length > 0) {
    // Clear the array of products, if it is exist
    instance.products = [];
  }

  // Set date of last updating
  instance.updatedAt = Date.parse(new Date());

  // Create the new copy of model's instance
  var copy = new Price(instance);

  // Save it async and return promise of result
  return copy.save().then(data => data);
}

function readById(id) {
  if (id === undefined) {
    // If id is not passed
    let message = 'Methor read() expects a parameter, but no one was passed.';
    return { error: message };
  } else if (!id instanceof String) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    return { error: message };
  } else if (id === '') {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    return { error: message };
  }

  var result = Price.findById(id);
  return result;
}

function read() {
  var result = Price.find();
  return result;
}

function update(id, query) {
  if (arguments.length < 2) {
    // If method update called without parameters
    let message = 'Methor read() expects two parameters, but there was passed ' + arguments.length;
    return { error: message };
  } else if (!id instanceof String) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    return { error: message };
  } else if (id === '') {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    return { error: message };
  } else if (!query instanceof Object) {
    // If query is not an object
    let message = '\'query\' must be an object.';
    return { error: message };
  } else if (Object.keys(query).length === 0) {
    // If query object has no propertys
    let message = '\'query\' cannot be empty object';
    return { error: message };
  } else if (Object.keys(query).length > 0) {
    // If query consists some field, but they are not specified in Price model
    let message = "";
    let notExistingField = false;
    Object.keys(query).forEach(key => {
      if (key !== 'name' && key !== 'discount' && key !== 'products') {
        message = 'In model \'Price\' field ' + key + ' is not specified.';
        notExistingField = true;
      }
    });
    if (notExistingField) {
      return { error: message };
    }
  } else if (query.products && !Array.isArray(query)) {
    // If field 'products' is existed, but it is not an array
    let message = '\'query.products\' must be an array';
    return { error: message };
  } else if (query.products.length === 0) {
    // IF query.products is an empty array
    let message = '\'query.products\' cannot be empty array';
    return { error: message };
  } else if (query.name && !query.name instanceof String) {
    // If field 'name' is existed, but it is not a string
    let message = '\'qeury.name\' must be a string';
    return { error: message };
  } else if (query.name.length === 0) {
    // If query.name is an empty string
    let message = '\'query.name\' cannot be empty string';
    return { error: message };
  } else if (query.discount && !query.discount instanceof Number) {
    // If field 'discount' is existed, but it is not a Number
    let message = '\'query.discount\' must be a number';
    return { error: message };
  }

  var result = Price.update({
    _id: id
  }, {
    $set: query
  })

  return result;
}

function remove(id) {
  if (id === undefined) {
    // If id is not passed
    let message = 'Methor remove() expects a parameter, but no one was passed.';
    return { error: message };
  } else if (!id instanceof String) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    return { error: message };
  } else if (id === '') {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    return { error: message };
  }

  var result = Price.remove({
    _id: id
  });

  return result;
}

const Interface = {
  create: create,
  readById: readById,
  read: read,
  update: update,
  remove: remove
};

module.exports = Interface;
