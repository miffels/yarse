'use strict'

FatSecretRequestBlank = require '../../../../src/client/api/fatsecret/FatSecretRequestBlank'

describe 'requestBlank', ->
	requestBlank = null;
	beforeEach ->
		requestBlank = new FatSecretRequestBlank()
		
	it 'should contain some parameters', ->
		requestBlank.should.have.property 'parameters'
	it 'should have a baseUrl', ->
		requestBlank.should.have.property 'baseUrl'
	it 'should contain the REST configuration parameters', ->
		requestBlank.parameters.should.have.property 'oauth_signature_method'
		requestBlank.parameters.should.have.property 'oauth_timestamp'
		requestBlank.parameters.should.have.property 'oauth_nonce'
		requestBlank.parameters.should.have.property 'oauth_version'
		
	describe '#sortedParameters', ->
		it 'should sort the configuration parameters', ->
			requestBlank.parameters.z = {};
			requestBlank.parameters.a = {};
			lastIndex = requestBlank.getSortedParameters().length - 1
			requestBlank.getSortedParameters()[0].should.equal 'a'
			requestBlank.getSortedParameters()[lastIndex].should.equal 'z'

	describe '#concatenateComponents', ->
		it 'should concatenate two strings using '&'', ->
			concatenatedString = requestBlank.concatenateComponents 'foo', 'bar'
			concatenatedString.should.equal 'foo&bar'
			
	describe '#stringifyParameters', ->
		it 'should turn parameters into key-value pairs', ->
			requestBlank.parameters = {}
			requestBlank.parameters.a = '&'
			requestBlank.stringifyParameters().should.equal 'a=&'

	describe '#getSignatureBaseString', ->
		it 'should concatenate method, baseUrl and parameters and escape non-alphanumerical characters', ->
			requestBlank.parameters = {}
			requestBlank.parameters.a = '&'
			stringifiedParameters = requestBlank.stringifyParameters();
			requestBlank.method = 'POST'
			requestBlank.baseUrl = '=here'
			requestBlank.getSignatureBaseString(stringifiedParameters).should.equal 'POST&%3Dhere&a%3D%26'
			
	describe '#encode', ->
		it 'should escape non-alphanumerical characters', ->
			requestBlank.encode('a=&').should.equal 'a%3D%26'
