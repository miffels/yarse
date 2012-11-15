'use strict';

var RecipeMapper = require('./RecipeMapper');
var Recipe = require('../../model/recipe/Recipe');
var RecipeList = require('../../model/recipe/RecipeList');
var RecipeIngredientList = require('../../model/ingredient/RecipeIngredientList');

function BackboneMapper(recipeMapper) {
	console.log(recipeMapper);
	this.recipeMapper = recipeMapper || new RecipeMapper();
	this.knownIngredients = new RecipeIngredientList();
	this.knownIngredients.fetch();
}

BackboneMapper.prototype.mapRecipes = function(rawData) {
	console.log(rawData);
	var recipeAttributes = this.recipeMapper.mapRecipes(rawData);
	var recipeList = new RecipeList();
	
	console.log(recipeAttributes);
	
	recipeAttributes.forEach(function(recipeData) {
		recipeList.add(this.mapRecipe(recipeData));
	}.bind(this));
	
	return recipeList;
};

BackboneMapper.prototype.mapRecipe = function(recipeData) {
	this.mapIngredients(recipeData);
	
	return new Recipe(recipeData);
};

BackboneMapper.prototype.mapIngredients = function(recipeData) {
	var recipeIngredientData = recipeData.ingredients;
	
	if(!recipeIngredientData) {
		return;
	}
	
	var recipeIngredientIds = [];
	recipeIngredientData.forEach(function(ingredient) {
		recipeIngredientIds.push(ingredient.id);
	}.bind(this));
	
	var knownIngredientsInRecipe = this.knownIngredients.filterById(recipeIngredientIds);
	
	// Some more magic
};

module.exports = BackboneMapper;