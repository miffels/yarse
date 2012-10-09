'use strict';

var http = require('http');

var server = http.createServer(function (request, response) {
	console.log('tis a request, huuuiiii!');
	response.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
});