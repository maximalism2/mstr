/**
 * Module exports custom interface for database's model Product;
 * The interface includes methods:
 *
 * - 'create', which expects an object consists of:
 *      name - String. Product name. Required.
 *      cost - Number. Value of cost of Product. Required.
 *      priceOrigin - String (ObjectId) of Price which include this product. Required.
 *      unitOfMeasurment - String. Value of unit of measurment of product. Required.
 *    returned promise with result if success, and false if creating fail;
 *
 * - 'createOf', which expects an array of objects, objects must consist of:
 *      name - String. Product name. Required.
 *      cost - Number. Value of cost of Product. Required.
 *      priceOrigin - String (ObjectId) of Price which include this product. Required.
 *      unitOfMeasurment - String. Value of unit of measurment of product. Required.
 *    !! IMPORTANT
 *    createOf returns Object as { ok: Boolean }
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
 *    write the docs for 'readWhere' method, add there chenking
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect = require('../connect');
var template = require('../templates/productModelTemplate');

const connection = connect();
var productSchema = new Schema(template);

var Product = connection.model('Products', productSchema);

function create(instance) {
  if (arguments.length === 0) {
    // If parameters are not passed
    let message = 'Method expects a parameter, but no one was passed';
    throw new Error(message);
    return { error: message };
  } else if (!(instance instanceof Object)) {
    // If instance is not object
    let message = 'Instance must be an Object';
    throw new Error(message);
    return { error: message };
  } else if (Object.keys(instance).length === 0) {
    // If instance object has no propertys
    let message = 'Cannot create empty instance'
    throw new Error(message);
    return { error: message };
  } else if (!instance.hasOwnProperty('name')) {
    // If instance has no property name
    let message = 'Instance must have the \'name\' property';
    throw new Error(message);
    return { error: message };
  } else if (typeof instance.name !== 'string') {
    // If name is not a string
    let message = '\'instance.name\' must be a string';
    throw new Error(message);
    return { error: message };
  } else if (instance.name.length === 0) {
    // If instance.name is empty string
    let message = 'instance.name cannot be ""';
    throw new Error(message);
    return { error: message };
  } else if (instance.name.length > 300) {
    // If instance.name is longer than 300 characters
    let message = 'instance.name cannot be longer than 300 characters';
    throw new Error(message);
    return { error: message };
  } else if (!instance.hasOwnProperty('cost')) {
    // If instance has no property cost
    let message = 'Instance must have the \'cost\' property';
    throw new Error(message);
    return { error: message };
  } else if(!instance.cost instanceof Number) {
    // If instance.cost is not number
    let message = '\'instance.cost\' must be a number';
    throw new Error(message);
    return { error: message };
  } else if (instance.cost < 0) {
    // If cost is less then 0
    let message = '\'instance.cost\' must be bigger or equal 0';
    throw new Error(message);
    return { error: message };
  } else if (!instance.hasOwnProperty('priceOrigin')) {
    // If instance has no property priceOrigin (link to parents price)
    let message = 'Instance must have the \'priceOrigin\' property';
    throw new Error(message);
    return { error: message };
  } else if (!instance.priceOrigin instanceof String) {
    // If priceOrigin is not a string
    let message = '\'instance.priceOrigin\' must be a string';
    throw new Error(message);
    return { error: message };
  } else if (instance.priceOrigin.length === 0) {
    // If priceOrigin is empty string
    let message = '\'instance.priceOrigin\' cannot be empty string';
    throw new Error(message);
    return { error: message };
  } else if (!instance.hasOwnProperty('unitOfMeasurment')) {
    // If instance has no property unitOfMeasurment
    let message = 'Instance must have the \'unitOfMeasurment\' property';
    throw new Error(message);
    return { error: message };
  } else if (!instance.unitOfMeasurment instanceof String) {
    // If unitOfMeasurment is not a string
    let message = '\'instance.unitOfMeasurment\' must be a string';
    throw new Error(message);
    return { error: message };
  } else if (instance.unitOfMeasurment.length === 0) {
    // If unitOfMeasurment is empty string
    let message = '\'instance.unitOfMeasurment\' cannot be empty string';
    throw new Error(message);
    return { error: message };
  }

  // Create the new copy of model's instance
  var copy = new Product(instance);

  // Save it async and return promise of result
  return copy.save();
}

function createOf(pluralOfProducts) {
  if (pluralOfProducts === undefined) {
    // If parameter is not passed
    let message = 'Method \'createOf\' expects a parameter, but no one was passed';
    throw new Error(message);
    return { error: message }
  } else if (!Array.isArray(pluralOfProducts)) {
    // If pluralOfProducts is not array
    let message = 'Method \'createOf\' expects an array';
    throw new Error(message);
    return { error: message }
  } else if (pluralOfProducts.length === 0) {
    // If there is passed an empty array
    let message = 'Passed array cannot be empty';
    throw new Error(message);
    return { error: message };
  }

  // Checking instance in array

  // TODO make how to find and catch an error in array
  let checkingResult = pluralOfProducts.forEach((instance, index) => {
    if (!(instance instanceof Object)) {
      // If instance is not object
      let message = 'Method expects an array of objects';
      throw new Error(message);
      return { error: message };
    } else if (Object.keys(instance).length === 0) {
      // If instance object has no propertys
      let message = `'argument[${index}]' is the empty object`;
      throw new Error(message);
      return { error: message };
    } else if (!instance.hasOwnProperty('name')) {
      // If instance has no property name
      let message = `'argument[${index}] must have the 'name' property`;
      throw new Error(message);
      return { error: message };
    } else if (typeof instance.name !== 'string') {
      // If name is not a string
      let message = `'argument[${index}].name' must be a string`;
      throw new Error(message);
      return { error: message };
    } else if (instance.name.length === 0) {
      // If instance.name is empty string
      let message = `'argument[${index}].name' cannot be ""`;
      throw new Error(message);
      return { error: message };
    } else if (instance.name.length > 300) {
      // If instance.name is longer than 300 characters
      let message = `'argument[${index}].name' cannot be longer than 300 characters`;
      throw new Error(message);
      return { error: message };
    } else if (!instance.hasOwnProperty('cost')) {
      // If instance has no property cost
      let message = `'argument[${index}]' must have the 'cost' property`;
      throw new Error(message);
      return { error: message };
    } else if(!instance.cost instanceof Number) {
      // If instance.cost is not number
      let message = `'argument[' + index + '].cost' must be a number`;
      throw new Error(message);
      return { error: message };
    } else if (instance.cost < 0) {
      // If cost is less then 0
      let message = `'argument[${index}].cost' must be bigger or equal 0`;
      throw new Error(message);
      return { error: message };
    } else if (!instance.hasOwnProperty('priceOrigin')) {
      // If instance has no property priceOrigin (link to parents price)
      let message = `'argument[${index}]' must have the 'priceOrigin' property`;
      throw new Error(message);
      return { error: message };
    } else if (!instance.priceOrigin instanceof String) {
      // If priceOrigin is not a string
      let message = `'argument[${index}].priceOrigin' must be a string`;
      throw new Error(message);
      return { error: message };
    } else if (instance.priceOrigin.length === 0) {
      // If priceOrigin is empty string
      let message = `'argument[${index}].priceOrigin' cannot be empty string`;
      throw new Error(message);
      return { error: message };
    } else if (!instance.hasOwnProperty('unitOfMeasurment')) {
      // If instance has no property unitOfMeasurment
      let message = `'argument[${index}]' must have the 'unitOfMeasurment' property`;
      throw new Error(message);
      return { error: message };
    } else if (!instance.unitOfMeasurment instanceof String) {
      // If unitOfMeasurment is not a string
      let message = `'argument[${index}].unitOfMeasurment' must be a string`;
      throw new Error(message);
      return { error: message };
    } else if (instance.unitOfMeasurment.length === 0) {
      // If unitOfMeasurment is empty string
      let message = `'argument[${index}].unitOfMeasurment' cannot be empty string`;
      throw new Error(message);
      return { error: message };
    }
  });

  if (checkingResult.error) {
    return checkingResult;
  }

  // Save instances in array
  let result = {
    ok: true
  };
  pluralOfProducts.forEach(instance => {
    let copy = new Product(instance);
    copy.save();

    /* TODO check .getLastErrorObj method in Mongoose */
    if (!Product.getLastErrorObj().ok) {
      result.ok = false;
    }
  });

  return result;
}

function readById(id) {
  if (id === undefined) {
    // If id is not passed
    let message = 'Methor read() expects a parameter, but no one was passed.';
    throw new Error(message);
    return { error: message };
  } else if (!id instanceof String) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    throw new Error(message);
    return { error: message };
  } else if (id === '') {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    throw new Error(message);
    return { error: message };
  }

  var result = Product.findById(id);
  return result;
}

function read() {
  var result = Product.find();
  return result;
}

function readWhere(query) {
  var result = Product.find(query);
  return result;
}

function update(id, query) {
  if (arguments.length < 2) {
    // If method update called without parameters
    let message = 'Methor read() expects two parameters, but there was passed ' + arguments.length;
    throw new Error(message);
    return { error: message };
  } else if (!id instanceof String) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    throw new Error(message);
    return { error: message };
  } else if (id.length === 0) {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    throw new Error(message);
    return { error: message };
  } else if (!query instanceof Object) {
    // If query is not an object
    let message = '\'query\' must be an object.';
    throw new Error(message);
    return { error: message };
  } else if (Object.keys(query).length === 0) {
    // If query object has no propertys
    let message = '\'query\' cannot be empty object';
    throw new Error(message);
    return { error: message };
  }

  // Checking query object
  if (Object.keys(query).length > 0) {
    // If query consists some field, but they are not specified in Product model
    let message = "";
    let notExistingField = false;
    Object.keys(query).forEach(key => {
      if (key !== 'name' && key !== 'cost' && key !== 'unitOfMeasurment') {
        throw new Error('In model \'Product\' field ' + key + ' is not specified.');
        message = 'In model \'Product\' field ' + key + ' is not specified.';
        notExistingField = true;
      }
    });
    if (notExistingField) {
      return { error: message };
    }
  }
  if (query.priceOrigin) {
    // If expected priceOrigin in query throw error, we cannot change origin
    let message = 'Cannot change priceOrigin in any product';
    throw new Error(message);
    return { error: message }
  } else if (query.name && !query.name instanceof String) {
    // If field 'name' is existed, but it is not a string
    let message = '\'qeury.name\' must be a string';
    throw new Error(message);
    return { error: message };
  } else if (query.name && query.name.length === 0) {
    // If query.name is an empty string
    let message = '\'query.name\' cannot be empty string';
    throw new Error(message);
    return { error: message };
  } else if (query.cost && !query.cost instanceof Number) {
    // If field 'cost' is existed, but it is not a Number
    let message = '\'query.cost\' must be a number';
    throw new Error(message);
    return { error: message };
  } else if (query.unitOfMeasurment && !query.unitOfMeasurment instanceof String) {
    // If field 'unitOfMeasurment' is existed, but it is not a string
    let message = '\'qeury.unitOfMeasurment\' must be a string';
    throw new Error(message);
    return { error: message };
  } else if (query.unitOfMeasurment && query.unitOfMeasurment.length === 0) {
    // If query.unitOfMeasurment is an empty string
    let message = '\'query.unitOfMeasurment\' cannot be empty string';
    throw new Error(message);
    return { error: message };
  }

  var result = Product.update({
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
    throw new Error(message);
    return { error: message };
  } else if (!id instanceof String) {
    // If id is not a string
    let message = '\'id\' must be a string.';
    throw new Error(message);
    return { error: message };
  } else if (id === '') {
    // If id equal empty string
    let message = '\'id\' cannot be empty string.';
    throw new Error(message);
    return { error: message };
  }

  var result = Product.remove({
    _id: id
  });

  return result;
}

const Interface = {
  create: create,
  createOf: createOf,
  readById: readById,
  update: update,
  read: read,
  remove: remove
};

module.exports = Interface;
