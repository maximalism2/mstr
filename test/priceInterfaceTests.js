'use strict';
var assert = require('assert');
var Price = require('../db/models/Prices');

function isErrorObject(o) {
  return o instanceof Object && o.hasOwnProperty('error') && typeof o.error === 'string';
}

describe('Model interface', function() {
  describe('Price', function() {
    describe('.create(), must returns an object with error when:', function() {
      it('passed nothing', function() {
        let res = Price.create();
        assert.equal(true, isErrorObject(res));
      });

      it('passed not object', function() {
        let res = Price.create('some string');
        assert.equal(true, isErrorObject(res));
      });

      it('passed {} (empty object)', function() {
        let res = Price.create({});
        assert.equal(true, isErrorObject(res));
      });

      it('passed instance without name property', function() {
        let instance = {
          someProperty: 'some value'
        }
        let res = Price.create(instance);
        assert.equal(true, isErrorObject(res));
      });

      it('passed instance when the name property is not a string', function() {
        let instance = {
          name: 123
        }
        let res = Price.create(instance);
        assert.equal(true, isErrorObject(res))
      });

      it('passed instance with the name property which is an empty string', function() {
        let instance = {
          name: ''
        }
        let res = Price.create(instance);
        assert.equal(true, isErrorObject(res));
      });

      it('passed instance with the name property which is longer than 200 characters', function() {
        let instance = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga recusandae laudantium ipsum reprehenderit totam obcaecati repellat dolores, veniam minima. Quidem officia quae itaque blanditiis sed quos nulla quia. Placeat, veritatis!'
        }
        let res = Price.create(instance);
        assert.equal(true, isErrorObject(res));
      });
    });
    describe('.readById(), must returns an object with error when:', function() {
      it('passed any arguments', function() {
        let res = Price.readById();
        assert.equal(true, isErrorObject(res));
      });

      it('passed some id, but it is not a string', function() {
        let res = Price.readById(123);
        assert.equal(true, isErrorObject(res));
      });

      it('passed an empty id string', function() {
        let res = Price.readById('');
        assert.equal(true, isErrorObject(res));
      });
    });
    describe('.update(), must returns an object with error when:', function() {
      it('passed any arguments', function() {
        let res = Price.update();
        assert.equal(true, isErrorObject(res));
      });

      it('passed only one argument', function() {
        let res = Price.update('first argument');
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where the first argument (id) is not a string', function() {
        let query = 'some query';
        let res = Price.update(123, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments. where id is an empty string', function() {
        let query = 'some query';
        let res = Price.update('', query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where the second argument (query) is not an object', function() {
        let id = 'some id';
        let query = 'query is not object';
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where query is an empty object', function() {
        let id = 'some id';
        let query = {};
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed arguments, where query hasn\'t one of required fields', function() {
        let id = 'some id';
        let query = {
          notSpecifiedField: true
        };
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where name exists, but it is not a string', function() {
        let id = 'some id';
        let query = {
          name: 123
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query. where name exists, but it is an empty string', function() {
        let id = 'some id';
        let query = {
          name: ''
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where name exists, but it is bigger than 200 characters', function() {
        let id = 'some id';
        let query = {
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga recusandae laudantium ipsum reprehenderit totam obcaecati repellat dolores, veniam minima. Quidem officia quae itaque blanditiis sed quos nulla quia. Placeat, veritatis!'
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where discount exists, but it is not a number', function() {
        let id = 'some id';
        let query = {
          discount: 'discount is a string'
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where discount exists, but it is not between 0 and 100', function() {
        let id = 'some id';
        let query = {
          discount: -1
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed qeury, where products exists, but it is not an array', function() {
        let id = 'some id';
        let query = {
          products: 'some string'
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      it('passed query, where products exists, but items is not the stings', function() {
        let id = 'some id';
        let query = {
          products: [1, 2, 3]
        }
        let res = Price.update(id, query);
        assert.equal(true, isErrorObject(res));
      });

      if('passed query, where products exists, but one of items is not a string', function() {
        let id = 'some id';
        let query = {
          products: [
            "a string",
            0,
            "other string"
          ]
        }
        let res = Price.update(id, query);
        assert.equal(true. isErrorObject(res));
      });
    });
    describe('.remove(), must returns an object with error when:', function() {
      it('passed any arguments', function() {
        let res = Price.readById();
        assert.equal(true, isErrorObject(res));
      });

      it('passed some id, but it is not a string', function() {
        let res = Price.readById(123);
        assert.equal(true, isErrorObject(res));
      });

      it('passed an empty id string', function() {
        let res = Price.readById('');
        assert.equal(true, isErrorObject(res));
      });
    });
  });
});
