'use strict';

var FatSecretRequestBlank = require('./FatSecretRequestBlank');
var $ = require('jquery');
var yarseConfiguration = require('../../../../package.json').yarse;
var ErrorView = require('../../view/common/ErrorView');

function FatSecret() {
	this.cache = {};
}

FatSecret.prototype.getRecipesFor = function(kitchen, callback, callId) {
	var requestBlank = new FatSecretRequestBlank();
	requestBlank.parameters.method = 'recipes.search';
	requestBlank.parameters.max_results = 20;
	requestBlank.parameters.search_expression = this.buildSearchStringFrom(kitchen.get('ingredients'));
	var queryId = 's' + requestBlank.parameters.search_expression;
	
	this.makeRequest(requestBlank, callback, callId, queryId);
};

FatSecret.prototype.fetchRecipe = function(id, callback, callId) {
	var requestBlank = new FatSecretRequestBlank();
	requestBlank.parameters.method = 'recipe.get';
	requestBlank.parameters.recipe_id = id;
	var queryId = 'r' + id;
	
	this.makeRequest(requestBlank, callback, callId, queryId);
};

FatSecret.prototype.makeRequest = function(requestBlank, callback, callId, queryId) {
	var cachedResult = this.cache[queryId];
	
	if(cachedResult) {
		callback(cachedResult, callId);
	} else {
		requestBlank.makeRequest(function (url) {
			this.resolve(url, callback, callId, queryId);
		}.bind(this));
	}
};

FatSecret.prototype.resolve = function(url, callback, callId) {
	var forwardServerAddress = yarseConfiguration.signatureServer + ':' + yarseConfiguration.signatureServerPort +
	'?yarseMethod=' + yarseConfiguration.forwardMethod +
	'&target=' + encodeURIComponent(url);
	
	$.ajax({
		url: forwardServerAddress
	}).done(function(result) {
		callback(result, callId);
	}).error(function(error) {
		console.log(error.responseText);
		new ErrorView({message: 'Are you sure the required node server is up, running and configured?'}).render();
	});
};

FatSecret.prototype.buildSearchStringFrom = function(kitchenContents) {
	var searchString = '';
	var separator = '';
	kitchenContents.each(function (ingredient) {
		searchString = searchString + separator + ingredient.get('name');
		separator = ',';
	});
	return searchString;
};

module.exports = FatSecret;