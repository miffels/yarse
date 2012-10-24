'use strict';
var FatSecretRequestBlank = require('../src/FatSecretRequestBlank');
var $ = require('jQuery')

var requestBlank = new FatSecretRequestBlank();

requestBlank.parameters.format = 'json';
requestBlank.parameters.method = 'recipes.search';
requestBlank.parameters.search_expression = 'potato';

function resolve(url, done) {
	$.ajax({
		url: url
	}).done(function(result) {
		done(result);
	}).error(function(error) {
		console.log(error.responseText);
	});
}

requestBlank.makeRequest(function(url) {
	resolve(url, function(result) {
		var recipeBlank = new FatSecretRequestBlank();
		recipeBlank.parameters.format = 'json';
		recipeBlank.parameters.method = 'recipe.get';
		recipeBlank.parameters.recipe_id = result.recipes.recipe[0].recipe_id;
		recipeBlank.makeRequest(function (recipeUrl) {
			resolve(recipeUrl, function(recipe) {
			console.log(recipe);
		});
		});
	});
});