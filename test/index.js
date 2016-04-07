var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when it include 2', function () {
      assert.equal(-1, [2, 4].indexOf(3));
    });
  });
});
