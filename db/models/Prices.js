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
var Types = mongoose.Types;
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

  if (instance.hasOwnProperty('discount')) {
    let discount = Number(instance.discount);
    if (isNaN(discount)) {
      // If discount is existed, but it is not a number
      let message = 'instance.discount must be a number';
      return { error: message };
    } else if (!(discount >= 0 && discount <= 100)) {
      // If valut of discount is not between 0 and 100
      let message = 'instance.discount must be from 0 to 100';
      return { error: message };
    }
  } else {
    // If discount is undefined, let it be 0
    instance.discount = 0;
  }

  if (!instance.hasOwnProperty('currency')) {
    instance.currency = 'UAH';
  }

  if (instance.hasOwnProperty('products') && instance.products.length > 0) {
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
  } else if (!(id instanceof Types.ObjectId)) {
    // If id is not an ObjectId
    let message = '\'id\' must be an ObjectId.';
    return { error: message };
  }

  var result = Price.findById(id);
  return result;
}

function read() {
  var result = Price.find({}, '', {
    sort: {
      updatedAt: -1
    }
  });
  return result;
}

function update(id, query) {
  if (arguments.length < 2) {
    // If method update called without parameters
    let message = 'Methor read() expects two parameters, but there was passed ' + arguments.length;
    return { error: message };
  } else if (!(typeof id === 'string')) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    return { error: message };
  } else if (id === '') {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    return { error: message };
  } else if (!(query instanceof Object)) {
    // If query is not an object
    let message = '\'query\' must be an object.';
    return { error: message };
  } else if (Object.keys(query).length === 0) {
    // If query object has no propertys
    let message = '\'query\' cannot be empty object';
    return { error: message };
  }

  // Testing the query object
  if (Object.keys(query).length > 0) {
    // If query consists some field, but they are not specified in Price model
    let message = "";
    let notExistingField = false;
    Object.keys(query).forEach(key => {
      if (['name', 'discount', 'products', 'updatedAt', 'currency'].indexOf(key) === -1) {
        message = 'In model \'Price\' field ' + key + ' is not specified.';
        notExistingField = true;
      }
    });
    if (notExistingField) {
      return { error: message };
    }
  }

  if (query.hasOwnProperty('name')) {
    if (!(typeof query.name === 'string')) {
      // If field 'name' is existed, but it is not a stringify
      let message = '\'qeury.name\' must be a string';
      return { error: message };
    } else if (query.name.length === 0) {
      // If field name is an empty stringify
      let message = '\'query.name\' cannot be an empty string';
      return { error: message };
    } else if (query.name.length > 200) {
      // if field 'name' has more than 200 characters
      let message = '\'query.name\' cannot be bigger than 200 characters';
      return { error: message }
    }
  }

  if (query.hasOwnProperty('discount')) {
    let discount = Number(query.discount);
    if (isNaN(discount)) {
      // If field 'discount' exosted, but it is not a number
      let message = '\'query.dicount\' must be a number';
      return { error: message };
    } else if (!(discount >= 0 && discount <= 100)) {
      // If value of field 'discount' isn't between 0 and 100
      let message = 'Value of \'query.discount\' must be from 0 to 100';
      return { error: message };
    }
  }

  if (query.hasOwnProperty('products')) {
    if (!Array.isArray(query.products)) {
      // If field 'products' is existed, but it is not an array
      let message = '\'query.products\' must be an array';
      return { error: message };
    } else if (query.products.length > 0) {
      // Checking types of array items
      let message = '';
      let errorExists = false;
      query.products.forEach((item, index) => {
        item = String(item);
        if (errorExists) {
          // If error is already exists - return
          return;
        }
        if (item.length !== 24) {
          // If some item is not a string of 24 hex symbols
          message  = `All items in query.products should be a strings of 24 symbols,`;
          message += ` but query.products[${index}] has ${item.length}`;
          errorExists = true;
          return;
        }
      });

      if (errorExists) {
        return { error: message };
      }
    }
  }

  var result = Price.update({
    _id: Types.ObjectId(id)
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
  } else if (!(id instanceof Types.ObjectId)) {
    // If id is not a string
    let message = '\'id\' must be an ObjectId';
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
