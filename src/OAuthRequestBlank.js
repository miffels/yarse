'use strict';

function OAuthRequestBlank(parameters, baseUrl) {
	this.parameters = parameters;
	this.baseUrl = baseUrl;
	this.method = 'GET';
	this.accessToken = '';
}

OAuthRequestBlank.prototype.makeRequest = function(callback) {
	var stringifiedParameters = this.stringifyParameters();
	this.stringifySignature(stringifiedParameters, function(stringifiedSignature) {
		
		var request = this.concatenateComponents(this.baseUrl + '?' +
		stringifiedParameters + '&' +
		stringifiedSignature);
		
		callback(request);
	}.bind(this));
};

OAuthRequestBlank.prototype.signature = function(stringifiedParameters, callback) {
	throw new Error('Abstract Method');
};

OAuthRequestBlank.prototype.getSignatureBaseString = function(stringifiedParameters) {
	return this.concatenateComponents(this.method,
		this.encode(this.baseUrl),
		this.encode(stringifiedParameters));
};

OAuthRequestBlank.prototype.concatenateComponents = function() {
	return Array.prototype.slice.call(arguments).join('&');
};

OAuthRequestBlank.prototype.encode = function(component) {
	return encodeURIComponent(component);
};

OAuthRequestBlank.prototype.stringifyParameters = function() {
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

OAuthRequestBlank.prototype.resolveParameter = function(parameterName) {
	var parameter = this.parameters[parameterName];
	return typeof parameter === 'function' ? parameter() : parameter;
};

OAuthRequestBlank.prototype.stringifySignature = function(stringifiedParameters, callback) {
	this.signature(stringifiedParameters, function(signature) {
		callback('oauth_signature=' + signature);
	});
};

OAuthRequestBlank.prototype.getSortedParameters = function() {
	var keys = [];
	for(var parameterName in this.parameters) {
		if(this.parameters.hasOwnProperty(parameterName)) {
			keys.push(parameterName);
		}
	}
	return keys.sort();
};

module.exports = OAuthRequestBlank;