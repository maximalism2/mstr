'use strict';
var assert = require('assert');
var Product = require('../db/models/Products');
var Types = require('mongoose').Types;

function isErrorObject(o) {
  return o instanceof Object && o.hasOwnProperty('error') && typeof o.error === 'string';
}

describe('Model interface', () => {
  describe('Product', () => {
    describe('.create(), must returns object with error when:', () => {
      it('called without arguments', () => {
        let res = Product.create();
        assert.equal(true, isErrorObject(res));
      });
      it('passed another that object', () => {
        let res = Product.create('some string');
        assert.equal(true, isErrorObject(res));
      });
      it('passed an empty object', () => {
        let res = Product.create({});
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object without the name property', () => {
        let instance = {
          someProperty: 'some value'
        };
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, with the name property, but it is not a string', () => {
        let instance = {
          name: 123
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, where the name is an empty string', () => {
        let instance = {
          name: ''
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, where the name has more then 300 characters', () => {
        let instance = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, which has a valid name property, but without the cost', () => {
        let instance = {
          name: 'some name',
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, which has the cost property, but it is not a number', () => {
        let instance = {
          name: 'some name',
          cost: 'some string'
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, which has the cost property, but it is smaller than 0', () => {
        let instance = {
          name: 'some name',
          cost: -1
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, which has the cost peoperty, but without priceOrigin', () => {
        let instance = {
          name: 'some name',
          cost: 123
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, where the priceOrigin is not a string', () => {
        let instance = {
          name: 'some name',
          cost: 123,
          priceOrigin: 123
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, where the priceOrigin is a string of some number of hex symbols, not 24', () => {
        let instance = {
          name: 'some name',
          cost: 123,
          priceOrigin: 'fc254fa2d25efd'
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, where the unitOfMeasurement is not define', () => {
        let instance = {
          name: 'some name',
          cost: 123,
          priceOrigin: Types.ObjectId('571fe8433d9f5ffc2bcea743'),
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object, where unitOfMeasurement is not a string', () => {
        let instance = {
          name: 'some name',
          cost: 123,
          priceOrigin: '571fe8433d9f5ffc2bcea743',
          unitOfMeasurement: 123
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object. where unitOfMeasurement is an empty string', () => {
        let instance = {
          name: 'some name',
          cost: 123,
          priceOrigin: '571fe8433d9f5ffc2bcea743',
          unitOfMeasurement: ''
        }
        let res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
    });
    describe('.create(), usually', () => {
      it('should return an object with created price', () => {
        let instance = {
          name: 'some name',
          cost: 123,
          priceOrigin: Types.ObjectId('571fe8433d9f5ffc2bcea743'),
          unitOfMeasurement: 'm'
        }
        let res = Product.create(instance);
        res.then(created => {
          assert.equal(true, created instanceof Object);
        })
      });
    });
    describe('.createOf(), must returns object with error when:', () => {
      it('called without parameters', () => {
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed a parameter, but it is not an array', () => {
        let res = Product.createOf({});
        assert.equal(true, isErrorObject(res));
      });
      it('passed an empty array', () => {
        let res = Product.createOf([]);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, which consists not only of objects', () => {
        let instance = [
          'some string',
          {},
          123
        ]
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array of empty objects', () => {
        let instance = [{}, {}, {}];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects don\'t have the name field', () => {
        let objectTemplate = { someProperty: 'some value' };
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects have the name property, but it is not a string', () => {
        let objectTemplate = { name: 123 };
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects have the name property, which is an empty string', () => {
        let objectTemplate = { name: '' };
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects have the name field, but it is longer than 300 characters', () => {
        let objectTemplate = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects hasn\'t the cost field', () => {
        let objectTemplate = {
          name: 'some name'
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where object.cost is not a number', () => {
        let objectTemplate = {
          name: 'some name',
          cost : 'some string'
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it ('passed an array, where object.cost is less than 0', () => {
        let objectTemplate = {
          name: 'some name',
          cost: -1
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects haven\'t the priceOrigin field', () => {
        let objectTemplate = {
          name: 'some name',
          cost: 123
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects have the priceOrigin field, but it is not a string', () => {
        let objectTemplate = {
          name: 'some name',
          cost: 123,
          priceOrigin: false
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects have the priceOrigin, but it is not a 24 hex symbols string', () => {
        let objectTemplate = {
          name: 'some name',
          cost: 123,
          priceOrigin: '123abc',
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where objects have no unitOfMeasurement field', () => {
        let objectTemplate = {
          name: 'some name',
          cost: 123,
          priceOrigin: '571fe8433d9f5ffc2bcea743'
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where object.unitOfMeasurement is not a string', () => {
        let objectTemplate = {
          name: 'some name',
          price: 123,
          priceOrigin: '571fe8433d9f5ffc2bcea743',
          unitOfMeasurement: 123
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
      it('passed an array, where object.unitOfMeasurement is an empty string', () => {
        let objectTemplate = {
          name: 'some name',
          price: 123,
          priceOrigin: '571fe8433d9f5ffc2bcea743',
          unitOfMeasurement: ''
        }
        let instance = [objectTemplate, objectTemplate, objectTemplate];
        let res = Product.createOf();
        assert.equal(true, isErrorObject(res));
      });
    });
    describe('.createOf(), usually:', () => {
      it('should returns array of new products', () => {
        let objectTemplate = {
          name: 'some name',
          cost: 123,
          priceOrigin: Types.ObjectId('571fe8433d9f5ffc2bcea743'),
          unitOfMeasurement: 'some unit'
        }
        let instance = [
          objectTemplate,
          objectTemplate,
          objectTemplate
        ]
        let res = Product.createOf(instance);
        assert(true, Array.isArray(res));
      });
    });
    describe('')
  });
});
