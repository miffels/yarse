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
	this.contexts = {};
	this.contextId = 0;
}

SignatureServer.prototype.handleQuery = function(request, response) {
	var contextId = this.contextId++;
	this.contexts[contextId] = {};
	this.contexts[contextId].query = url.parse(request.url, true).query;
	this.contexts[contextId].request = request;
	this.contexts[contextId].response = response;
	
	if(!this.contexts[contextId].query.yarseMethod) {
		this.respondBadRequest('Missing parameter \'yarseMethod\'', contextId);
		return;
	}
	var yarseMethod = this.methodHandlers[this.contexts[contextId].query.yarseMethod];
	if(yarseMethod) {
		yarseMethod.call(this, contextId);
	} else {
		this.respondBadRequest('Unknown method: ' + this.contexts[contextId].query.method, contextId);
	}
};

SignatureServer.prototype.respondBadRequest = function(message, contextId) {
	this.respond(400, message, contextId);
};

SignatureServer.prototype.respond = function(status, message, contextId, contentType) {
	var response = this.contexts[contextId].response;
	response.writeHead(status, {
		'Content-Type' : contentType ? contentType : 'text/plain',
		'Access-Control-Allow-Origin' : '*'
	});
	console.log('Responding with ' + (message.length < 50 ? message : message.substring(0, 49) + '...'));
	response.end(message);
};

SignatureServer.prototype.forward = function(contextId) {
	if(!this.contexts[contextId].query.target) {
		this.respondBadRequest('Missing parameter \'target\'', contextId);
	} else {
		console.log('Forwarding request: ' + this.contexts[contextId].query.target);
		this.forwardWithHttp(contextId);
	}
};

SignatureServer.prototype.forwardWithHttp = function(contextId) {
	http.get(this.contexts[contextId].query.target, function(response) {
		var data = '';
		response.on('data', function (chunk) {
			data += chunk;
		}.bind(this));
		response.on('end', function() {
			this.respond(200, data, contextId, 'application/json');
		}.bind(this));
	}.bind(this));
};

SignatureServer.prototype.forwardWithJQuery = function(contextId) {
	$.ajax({
		url: this.contexts[contextId].query.target,
		dataType: 'text'
	}).done(function(result) {
		this.respond(200, result, contextId, 'application/json');
	}.bind(this)).error(function(error) {
		console.log(error.responseText);
	});
};

SignatureServer.prototype.makeSignature = function(contextId) {
	if(this.contexts[contextId].query.data && this.contexts[contextId].query.accessSecret !== undefined) {
		
		console.log('Received request: Sign ' + this.contexts[contextId].query.data + ' using ' + this.contexts[contextId].query.accessSecret);
		
		this.readSecret(function(consumerSecret) {
			var signature = this.sign(consumerSecret, contextId);
			this.respond(200, signature, contextId);
		}.bind(this));
	} else {
		this.respondBadRequest('Missing parameter \'data\' or \'accessSecret\'', contextId);
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

SignatureServer.prototype.sign = function(consumerSecret, contextId) {
	var key = consumerSecret + '&' + this.contexts[contextId].query.accessSecret;
	return this.encode(this.encrypt(key, contextId));
};

SignatureServer.prototype.encode = function(data) {
	return encodeURIComponent(data);
};

SignatureServer.prototype.encrypt = function(key, contextId) {
	return crypto.createHmac('sha1', key).update(this.contexts[contextId].query.data).digest('base64');
};

SignatureServer.prototype.start = function(response) {
	this.server.listen(require('../../package.json').yarse.signatureServerPort || 80);
};

module.exports = SignatureServer;