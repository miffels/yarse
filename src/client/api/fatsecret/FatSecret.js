'use strict';

var FatSecretRequestBlank = require('./FatSecretRequestBlank');
var $ = require('jquery');

function FatSecret() {
}

FatSecret.prototype.getRecipesFor = function(kitchen, callback) {
	var requestBlank = new FatSecretRequestBlank();
	requestBlank.parameters.method = 'recipes.search';
	requestBlank.parameters.max_results = 50;
	requestBlank.parameters.search_expression = this.buildSearchStringFrom(kitchen.get('ingredients'));
	
	requestBlank.makeRequest(function(url) {
		this.resolve(url, callback);
	}.bind(this));
};

FatSecret.prototype.fetchRecipe = function(id, callback) {
	var requestBlank = new FatSecretRequestBlank();
	requestBlank.parameters.method = 'recipe.get';
	requestBlank.parameters.recipe_id = id;
	
	requestBlank.makeRequest(function (url) {
		this.resolve(url, callback);
	}.bind(this));
};

FatSecret.prototype.resolve = function(url, done) {
	$.ajax({
		url: url
	}).done(function(result) {
		done(result);
	}).error(function(error) {
		console.log(error.responseText);
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