module.exports = {
	'oauth_consumer_key': function() { return '1ddf07704cef4f0b9988738eca807a30';},
	'oauth_signature_method': function() { return 'HMAC-SHA1';},
	'oauth_timestamp': function() { return new Date().getTime();},
	'oauth_nonce' : function() { return Math.floor(Math.random() * 1024);},
	'oauth_version': function() { return '1.0';
}}