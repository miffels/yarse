'use strict'

function OAuthBaseParameters() {
	this.oauth_consumer_key = '1ddf07704cef4f0b9988738eca807a30';
	this.oauth_signature_method = 'HMAC-SHA1';
	this.oauth_timestamp = function() { return new Date().getTime();};
	this.oauth_nonce = function() { return Math.floor(Math.random() * 1024*1024);};
	this.oauth_version = '1.0';
	this.format = 'json';
}

module.exports = OAuthBaseParameters;