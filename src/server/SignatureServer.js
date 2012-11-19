'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var crypto = require('crypto');
var config = require('../../package.json').yarse;
var $ = require('jquery');

function SignatureServer() {
	this.server = http.createServer(this.handleQuery.bind(this));
	this.methodHandlers = {
		'sign': this.makeSignature,
		'cors': this.forward
	};
}

SignatureServer.prototype.handleQuery = function(request, response) {
	this.query = url.parse(request.url, true).query;
	this.response = response;
	if(!this.query.yarseMethod) {
		this.respondBadRequest('Missing parameter \'yarseMethod\'');
		return;
	}
	var yarseMethod = this.methodHandlers[this.query.yarseMethod];
	if(yarseMethod) {
		yarseMethod.apply(this);
	} else {
		this.respondBadRequest('Unknown method: ' + this.query.method);
	}
};

SignatureServer.prototype.respondBadRequest = function(message) {
	this.respond(400, message);
};

SignatureServer.prototype.respond = function(status, message, contentType) {
	this.response.writeHead(status, {
		'Content-Type' : contentType ? contentType : 'text/plain',
		'Access-Control-Allow-Origin' : '*'
	});
	console.log('Responding with ' + message);
	this.response.end(message);
};

SignatureServer.prototype.forward = function() {
	if(!this.query.target) {
		this.respondBadRequest('Missing parameter \'target\'');
	} else {
		console.log('Forwarding request: ' + this.query.target);
		this.forwardWithHttp();
	}
};

SignatureServer.prototype.forwardWithHttp = function() {
	http.get(this.query.target, function(response) {
		var data = '';
		response.on('data', function (chunk) {
			data += chunk;
		}.bind(this));
		response.on('end', function() {
			this.respond(200, data, 'application/json');
		}.bind(this));
	}.bind(this));
};

SignatureServer.prototype.forwardWithJQuery = function() {
	$.ajax({
		url: this.query.target,
		dataType: 'text'
	}).done(function(result) {
		this.respond(200, result, 'application/json');
	}.bind(this)).error(function(error) {
		console.log(error.responseText);
	});
};

SignatureServer.prototype.makeSignature = function() {
	if(this.query.data && this.query.accessSecret !== undefined) {
		
		console.log('Received request: Sign ' + this.query.data + ' using ' + this.query.accessSecret);
		
		this.readSecret(function(consumerSecret) {
			var signature = this.sign(consumerSecret);
			this.respond(200, signature);
		}.bind(this));
	} else {
		this.respondBadRequest('Missing parameter \'data\' or \'accessSecret\'');
	}
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

SignatureServer.prototype.sign = function(consumerSecret) {
	var key = consumerSecret + '&' + this.query.accessSecret;
	return this.encode(this.encrypt(key));
};

SignatureServer.prototype.encode = function(data) {
	return encodeURIComponent(data);
};

SignatureServer.prototype.encrypt = function(key) {
	return crypto.createHmac('sha1', key).update(this.query.data).digest('base64');
};

SignatureServer.prototype.start = function(response) {
	this.server.listen(require('../../package.json').yarse.signatureServerPort || 80);
};

module.exports = SignatureServer;