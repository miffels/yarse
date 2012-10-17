'use strict';

describe('Array', function() {
  return describe('#indexOf()', function() {
    return it('should return -1 when not present', function() {
      return [1, 2, 3].indexOf(4).should.equal(-1);
    });
  });
});
