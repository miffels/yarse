'use strict'

function OAuthBaseParameters() {
	this.oauth_consumer_key = function() { return '1ddf07704cef4f0b9988738eca807a30';};
	this.oauth_signature_method = function() { return 'HMAC-SHA1';};
	this.oauth_timestamp = function() { return new Date().getTime();};
	this.oauth_nonce = function() { return Math.floor(Math.random() * 1024);};
	this.oauth_version = function() { return '1.0';};
}

module.exports = OAuthBaseParameters;