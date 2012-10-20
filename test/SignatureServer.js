'use strict';

var SignatureServer;

SignatureServer = require('../src/SignatureServer');

describe('SignatureServer', function() {
  var signatureServer;
  signatureServer = null;
  beforeEach(function() {
    return signatureServer = new SignatureServer;
  });
  it('should have a start method', function() {
    return signatureServer.should.have.property('start');
  });
  it('should have a respond method', function() {
    return signatureServer.should.have.property('respond');
  });
  return it('should have a handleQuery method', function() {
    return signatureServer.should.have.property('handleQuery');
  });
});
