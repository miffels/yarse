'use strict';

var FatSecretRequestBlank = require('./FatSecretRequestBlank');
var $ = require('jquery');
var yarseConfiguration = require('../../../../package.json').yarse;
var ErrorView = require('../../view/common/ErrorView');

function FatSecret() {
}

FatSecret.prototype.getRecipesFor = function(kitchen, callback, callId) {
	var requestBlank = new FatSecretRequestBlank();
	requestBlank.parameters.method = 'recipes.search';
	requestBlank.parameters.max_results = 50;
	requestBlank.parameters.search_expression = this.buildSearchStringFrom(kitchen.get('ingredients'));
	
	requestBlank.makeRequest(function(url) {
		this.resolve(url, callback, callId);
	}.bind(this));
};

FatSecret.prototype.fetchRecipe = function(id, callback, callId) {
	var requestBlank = new FatSecretRequestBlank();
	requestBlank.parameters.method = 'recipe.get';
	requestBlank.parameters.recipe_id = id;
	
	requestBlank.makeRequest(function (url) {
		this.resolve(url, callback, callId);
	}.bind(this));
};

FatSecret.prototype.resolve = function(url, callback, callId) {
	var forwardServerAddress = yarseConfiguration.signatureServer + ':' + yarseConfiguration.signatureServerPort +
	'?yarseMethod=' + yarseConfiguration.forwardMethod +
	'&target=' + encodeURIComponent(url);
	
	$.ajax({
		url: forwardServerAddress
	}).done(function(result) {
		console.log('Resolved call ID ' + callId);
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