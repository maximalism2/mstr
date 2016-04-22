'use strict';
var assert = require('assert');
var Price = require('../db/models/Prices');

describe('Database', () => {
  describe('.create()', () => {
  describe('Price', () => {
      it('should return object with error when passed {} (empty object)', () => {
        assert.equal('string', typeof Price.create({}).error);
      });
    })
  });
});
