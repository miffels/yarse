'use strict';

var $ = require('jQuery');
var yarseConfiguration = require('../package.json').yarse;
var OAuthRequestBlank = require('./OAuthRequestBlank');
var OAuthBaseParameters = require('../config/oauth');

function FatSecretRequestBlank(parameters) {
	OAuthRequestBlank.call(this, parameters ? parameters : new OAuthBaseParameters(), yarseConfiguration.baseUrl);
}

FatSecretRequestBlank.prototype = new OAuthRequestBlank();
FatSecretRequestBlank.prototype.constructor = FatSecretRequestBlank;

OAuthRequestBlank.prototype.signature = function(stringifiedParameters, callback) {
	var signatureBaseString = encodeURIComponent(this.getSignatureBaseString(stringifiedParameters));
	var accessSecret = yarseConfiguration.accessSecret ? yarseConfiguration.accessSecret : '';
	var signatureServerAddress = yarseConfiguration.signatureServer +
	'?data=' + signatureBaseString +
	'&accessSecret=' + accessSecret;
	
	$.ajax({
		url: signatureServerAddress
	}).done(function(signature) {
		callback(signature);
	}).error(function(error) {
		console.log('Could not contact signature server. The following error occured:');
		console.log(error.responseText);
	});
};

module.exports = FatSecretRequestBlank;
