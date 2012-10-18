'use strict';

var crypto = require('crypto');

function RemoteConfiguration() {
	this.parameters = require('../config/rest.js');
	this.baseUrl = 'http://platform.fatsecret.com/rest/server.api';
	this.method = 'GET';
}
// 28906be93fd34f2ba80f3a534781ccb8

RemoteConfiguration.prototype.getSortedParameters = function() {
	var keys = [];
	for(var parameterName in this.parameters) {
		if(this.parameters.hasOwnProperty(parameterName)) {
			keys.push(parameterName);
		}
	}
	return keys.sort();
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
	var sortedParameters = this.getSortedParameters();
	var firstParameter = sortedParameters[0];
	var resultString = firstParameter + '=' + this.parameters[firstParameter];
	for(var i = 1; i < this.parameters.length; i++) {
		var parameter = sortedParameters[i];
		resultString = this.concatenateComponents(resultString,
			parameter + '=' + this.parameters[parameter]);
	}
	return resultString;
};

RemoteConfiguration.prototype.concatenateComponents = function() {
	return Array.prototype.slice.call(arguments).join('&');
};

module.exports = RemoteConfiguration;