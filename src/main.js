'use strict';
var FatSecretRequestBlank = require('../src/FatSecretRequestBlank');

var requestBlank = new FatSecretRequestBlank();

requestBlank.parameters.method = 'foods.search';
requestBlank.parameters.search_expression = 'potato';

requestBlank.makeRequest(function(request) {
	console.log(request);
});