'use strict';
var assert = require('assert');
var Price = require('../db/models/Prices');
var Types = require('mongoose').Types;

function isErrorObject(o) {
  return o instanceof Object && o.hasOwnProperty('error') && typeof o.error === 'string';
}

describe('Model interface', function() {
  describe('Price', function() {
    describe('.create(), must returns an object with error when:', function() {
      it('passed nothing', function() {
        var res = Price.create();
        assert.equal(true, isErrorObject(res));
      });

      it('passed not object', function() {
        var res = Price.create('some string');
        assert.equal(true, isErrorObject(res));
      });

      it('passed {} (empty object)', function() {
        var res = Price.create({});
        assert.equal(true, isErrorObject(res));
      });

      it('passed instance without name property', function() {
        var instance = {
          someProperty: 'some value'
        }
        var res = Price.create(instance);
        assert.equal(true, isErrorObject(res));
      });

      it('passed instance when the name property is not a string', function() {
        var instance = {
          name: 123
        }
        var res = Price.create(instance);
        assert.equal(true, isErrorObject(res))
      });

      it('passed instance with the name property which is an empty string', function() {
        var instance = {
          name: ''
        }
        var res = Price.create(instance);
        assert.equal(true, isErrorObject(res));
      });

      it('passed instance with the name property which is longer than 200 characters', function() {
        var instance = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga recusandae laudantium ipsum reprehenderit totam obcaecati repellat dolores, veniam minima. Quidem officia quae itaque blanditiis sed quos nulla quia. Placeat, veritatis!'
        }
        var res = Price.create(instance);
        assert.equal(true, isErrorObject(res));
      });
    });
    describe('.create(), usually:', () => {
      it('should returns an object with created price', () => {
        let instance = {
          name: 'Test price',
          discount: 12,
          products: ['some product 1', 'some product 2']
        }
        let res = Price.create(instance);
        res.then(price => {
          assert.equal(true, price instanceof Object);
        });
      });
    });
    describe('.readById(), must returns an object with error when:', function() {
      it('passed any arguments', function() {
        var res = Price.readById();
        assert.equal(true, isErrorObject(res));
      });

      it('passed some id, but it is not an ObjectId', function() {
        var res = Price.readById(123);
        assert.equal(true, isErrorObject(res));
      });
    });
    describe('.readById(), usually:', () => {
      it('should returns an object with price or null', () => {
        let id = Types.ObjectId('5723c11dfd18d2a84edcaf5e');
        let res = Price.readById(id);
        res.then(price => {
          assert.equal(true, (price instanceof Object || price === null));
        })
      });
    });
    describe('.update(), must returns an object with error when:', function() {
      it('passed any arguments', function() {
        var res = Price.update();
        assert.equal(true, isErrorObject(res));
      });

      it('passed only one argument', function() {
        var res = Price.update('first argument');
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where the first argument (id) is not a string', function() {
        var query = 'some query';
        var res = Price.update(123, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments. where id is an empty string', function() {
        var query = 'some query';
        var res = Price.update('', query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where the second argument (query) is not an object', function() {
        var id = 'some id';
        var query = 'query is not object';
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where query is an empty object', function() {
        var id = 'some id';
        var query = {};
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where query hasn\'t one of required fields', function() {
        var id = 'some id';
        var query = {
          notSpecifiedField: true
        };
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where name exists, but it is not a string', function() {
        var id = 'some id';
        var query = {
          name: 123
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query. where name exists, but it is an empty string', function() {
        var id = 'some id';
        var query = {
          name: ''
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where name exists, but it is bigger than 200 characters', function() {
        var id = 'some id';
        var query = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga recusandae laudantium ipsum reprehenderit totam obcaecati repellat dolores, veniam minima. Quidem officia quae itaque blanditiis sed quos nulla quia. Placeat, veritatis!'
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where discount exists, but it is not a number', function() {
        var id = 'some id';
        var query = {
          discount: 'discount is a string'
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where discount exists, but it is not between 0 and 100', function() {
        var id = 'some id';
        var query = {
          discount: -1
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed qeury, where products exists, but it is not an array', function() {
        var id = 'some id';
        var query = {
          products: 'some string'
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where products exists, but items is not the stings', function() {
        var id = 'some id';
        var query = {
          products: [1, 2, 3]
        }
        var res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      if('passed query, where products exists, but one of items is not a string', function() {
        var id = 'some id';
        var query = {
          products: [
            "a string",
            0,
            "other string"
          ]
        }
        var res = Price.update(id, query);
        assert.equal(true. isErrorObject(res));
      });
    });
    describe('.remove(), must returns an object with error when:', function() {
      it('passed any arguments', function() {
        var res = Price.readById();
        assert.equal(true, isErrorObject(res));
      });

      it('passed some id, but it is not a string', function() {
        var res = Price.readById(123);
        assert.equal(true, isErrorObject(res));
      });

      it('passed an empty id string', function() {
        var res = Price.readById('');
        assert.equal(true, isErrorObject(res));
      });
    });
  });
});
