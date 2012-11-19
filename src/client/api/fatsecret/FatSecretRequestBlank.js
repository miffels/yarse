'use strict';

var $ = require('jquery');
var yarseConfiguration = require('../../../../package.json').yarse;
var OAuthRequestBlank = require('./OAuthRequestBlank');
var OAuthBaseParameters = require('../../../../config/oauth');
var ErrorView = require('../../view/common/ErrorView');

function FatSecretRequestBlank(parameters) {
	OAuthRequestBlank.call(this, parameters ? parameters : new OAuthBaseParameters(), yarseConfiguration.baseUrl);
}

FatSecretRequestBlank.prototype = new OAuthRequestBlank();
FatSecretRequestBlank.prototype.constructor = FatSecretRequestBlank;

OAuthRequestBlank.prototype.signature = function(stringifiedParameters, callback) {
	var signatureBaseString = encodeURIComponent(this.getSignatureBaseString(stringifiedParameters));
	var accessSecret = yarseConfiguration.accessSecret ? yarseConfiguration.accessSecret : '';
	var signatureServerAddress = yarseConfiguration.signatureServer + ':' + yarseConfiguration.signatureServerPort +
	'?yarseMethod=' + yarseConfiguration.signatureMethod +
	'&data=' + signatureBaseString +
	'&accessSecret=' + accessSecret;
	
	$.ajax({
		url: signatureServerAddress
	}).done(function(signature) {
		callback(signature);
	}).error(function(error) {
		new ErrorView({message: 'Are you sure the required node server is up, running and configured?'}).render();
		console.log(error.responseText);
	});
};

module.exports = FatSecretRequestBlank;
