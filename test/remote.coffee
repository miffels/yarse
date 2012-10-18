'use strict'

RemoteConfiguration = require '../src/remote'

describe 'RemoteConfiguration', ->
  remoteConfiguration = null;
  beforeEach ->
    remoteConfiguration = new RemoteConfiguration()
    
  it 'should contain some parameters', ->
    remoteConfiguration.should.have.property 'parameters'
  it 'should have a baseUrl', ->
    remoteConfiguration.should.have.property 'baseUrl'
  it 'should contain the REST configuration parameters', ->
    remoteConfiguration.parameters.should.have.property 'oauth_signature_method'
    remoteConfiguration.parameters.should.have.property 'oauth_timestamp'
    remoteConfiguration.parameters.should.have.property 'oauth_nonce'
    remoteConfiguration.parameters.should.have.property 'oauth_version'
    
  describe '#sortedParameters', ->
    it 'should sort the configuration parameters', ->
      remoteConfiguration.parameters.z = {};
      remoteConfiguration.parameters.a = {};
      lastIndex = remoteConfiguration.getSortedParameters().length - 1
      remoteConfiguration.getSortedParameters()[0].should.equal 'a'
      remoteConfiguration.getSortedParameters()[lastIndex].should.equal 'z'

  describe '#concatenateComponents', ->
    it 'should concatenate two strings using '&'', ->
      concatenatedString = remoteConfiguration.concatenateComponents 'foo', 'bar'
      concatenatedString.should.equal 'foo&bar'

  describe '#getSignatureBaseString', ->
    it 'should concatenate method, baseUrl and parameters and escape non-alphanumerical characters', ->
      remoteConfiguration.parameters = {}
      remoteConfiguration.parameters.a = '&'
      remoteConfiguration.method = 'POST'
      remoteConfiguration.baseUrl = '=here'
      remoteConfiguration.getSignatureBaseString().should.equal 'POST&%3Dhere&a%3D%26'
