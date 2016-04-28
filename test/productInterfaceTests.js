'use strict';
var assert = require('assert');
var Product = require('../db/models/Products');

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
      it('passed an object with the name property, but it is not a string', () => {
        let instance = {
          name: 123
        }
        ler res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object where the name is an empty string', () => {
        let instance = {
          name: ''
        }
        ler res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object where the name has more then 300 characters', () => {
        let instance = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
        ler res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object which has a valid name property, but without the cost', () => {
        let instance = {
          name: 'some name',
        }
        ler res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object which has the cost property, but it is not a number', () => {
        let instance = {
          name: 'some name',
          cost: 'some string'
        }
        ler res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object which has the cost property, but it is little then 0', () => {
        let instance = {
          name: 'some name',
          cost: -1
        }
        ler res = Product.create(instance);
        assert.equal(true, isErrorObject(res));
      });
      it('passed an object which has the cost peoperty, but without ')
    });
  });
  it('test to test', () => {
    assert.equal(1, 1);
  });
  it('test to test', () => {
    assert.equal(2, 2);
  });
});
