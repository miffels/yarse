'use strict';

var $ = require('jQuery');

function RemoteConfiguration() {
	this.parameters = require('../config/rest.js');
	this.baseUrl = 'http://platform.fatsecret.com/rest/server.api';
	this.method = 'GET';
	this.accessToken = '';
}

RemoteConfiguration.prototype.makeRequest = function() {
	var request = this.concatenateComponents(this.baseUrl + '?' +
		this.stringifyParameters() + '&' +
		this.stringifySignature());
	return request;
};

RemoteConfiguration.prototype.signature = function() {
	var signatureBaseString = this.getSignatureBaseString();
	var signature = 'not implemented';
	return signature;
};

RemoteConfiguration.prototype.getSignatureBaseString = function() {
	return this.concatenateComponents(this.method,
		this.encodedBaseUrl(),
		this.encodedParameters());
};

RemoteConfiguration.prototype.concatenateComponents = function() {
	return Array.prototype.slice.call(arguments).join('&');
};

RemoteConfiguration.prototype.encodedBaseUrl = function() {
	return encodeURIComponent(this.baseUrl);
};

RemoteConfiguration.prototype.encodedParameters = function() {
	return encodeURIComponent(this.stringifyParameters());
};

RemoteConfiguration.prototype.stringifyParameters = function() {
	var sortedParameterNames = this.getSortedParameters();
	var firstParameterName = sortedParameterNames[0];
	var resultString = firstParameterName + '=' + this.resolveParameter(firstParameterName);
	for(var i = 1; i < sortedParameterNames.length; i++) {
		var parameterName = sortedParameterNames[i];
		var value = this.resolveParameter(parameterName);
		resultString = this.concatenateComponents(resultString,
			parameterName + '=' + value);
	}
	return resultString;
};

RemoteConfiguration.prototype.resolveParameter = function(parameterName) {
	var parameter = this.parameters[parameterName];
	return typeof parameter === 'function' ? parameter() : parameter;
};

RemoteConfiguration.prototype.stringifySignature = function() {
	return 'oauth_signature=' + this.signature();
};

RemoteConfiguration.prototype.getSortedParameters = function() {
	var keys = [];
	for(var parameterName in this.parameters) {
		if(this.parameters.hasOwnProperty(parameterName)) {
			keys.push(parameterName);
		}
	}
	return keys.sort();
};

module.exports = RemoteConfiguration;