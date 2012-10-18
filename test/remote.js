'use strict';

var RemoteConfiguration;

RemoteConfiguration = require('../src/remote');

describe('RemoteConfiguration', function() {
  var remoteConfiguration;
  remoteConfiguration = null;
  beforeEach(function() {
    return remoteConfiguration = new RemoteConfiguration();
  });
  it('should contain some parameters', function() {
    return remoteConfiguration.should.have.property('parameters');
  });
  it('should have a baseUrl', function() {
    return remoteConfiguration.should.have.property('baseUrl');
  });
  it('should contain the REST configuration parameters', function() {
    remoteConfiguration.parameters.should.have.property('oauth_signature_method');
    remoteConfiguration.parameters.should.have.property('oauth_timestamp');
    remoteConfiguration.parameters.should.have.property('oauth_nonce');
    return remoteConfiguration.parameters.should.have.property('oauth_version');
  });
  describe('#sortedParameters', function() {
    return it('should sort the configuration parameters', function() {
      var lastIndex;
      remoteConfiguration.parameters.z = {};
      remoteConfiguration.parameters.a = {};
      lastIndex = remoteConfiguration.getSortedParameters().length - 1;
      remoteConfiguration.getSortedParameters()[0].should.equal('a');
      return remoteConfiguration.getSortedParameters()[lastIndex].should.equal('z');
    });
  });
  describe('#concatenateComponents', function() {
    return it('should concatenate two strings using ' & '', function() {
      var concatenatedString;
      concatenatedString = remoteConfiguration.concatenateComponents('foo', 'bar');
      return concatenatedString.should.equal('foo&bar');
    });
  });
  return describe('#getSignatureBaseString', function() {
    return it('should concatenate method, baseUrl and parameters and escape non-alphanumerical characters', function() {
      remoteConfiguration.parameters = {};
      remoteConfiguration.parameters.a = '&';
      remoteConfiguration.method = 'POST';
      remoteConfiguration.baseUrl = '=here';
      return remoteConfiguration.getSignatureBaseString().should.equal('POST&%3Dhere&a%3D%26');
    });
  });
});
