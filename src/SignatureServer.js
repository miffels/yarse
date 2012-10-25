'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var crypto = require('crypto');
var config = require('../package.json').yarse;

function SignatureServer() {
	this.server = http.createServer(this.handleQuery);
}

SignatureServer.prototype.handleQuery = function(request, response) {
	var query = url.parse(request.url, true).query;
	if(query.data !== undefined && query.accessSecret !== undefined) {
		
		console.log('Received request: Sign ' + query.data + ' using ' + query.accessSecret);
		
		SignatureServer.prototype.readSecret(function(consumerSecret) {
			var signature = SignatureServer.prototype.sign(query.data, query.accessSecret, consumerSecret);
			SignatureServer.prototype.respond(response, 200, signature);
		});
	} else {
		SignatureServer.prototype.respond(response, 400, 'bad request');
	}
};

SignatureServer.prototype.respond = function(response, status, message) {
	console.log('Responding');
	response.writeHead(status, {
		'Content-Type' : 'text/plain'
	});
	console.log('Sttill');
	response.end(message);
	console.log('now!');
};

SignatureServer.prototype.readSecret = function(callback) {
	fs.readFile('./config/secret', function (error, data) {
		if (error) {
			console.log('The signature file (' + config.signatureFile + ') could not be opened. Make sure it is in place and/or the location is configured properly in package.json.yarse.signatureFile. The following error occured:');
			console.log(error);
			throw error;
		}
		callback(data);
	});
};

SignatureServer.prototype.sign = function(data, accessSecret, consumerSecret) {
	var key = consumerSecret + '&' + accessSecret;
	return this.encode(this.encrypt(data, key));
};

SignatureServer.prototype.encode = function(data) {
	return encodeURIComponent(data);
};

SignatureServer.prototype.encrypt = function(data, key) {
	return crypto.createHmac('sha1', key).update(data).digest('base64');
};

SignatureServer.prototype.start = function(response) {
	this.server.listen(80);
};

module.exports = SignatureServer;