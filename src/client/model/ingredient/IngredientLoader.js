'use strict';

var Ingredient = require('../../model/ingredient/KitchenIngredient');
var IngredientList = require('../../model/ingredient/KitchenIngredientList');
var IngredientCategory = require('../../model/ingredient/IngredientCategory');
var IngredientCategoryList = require('../../model/ingredient/IngredientCategoryList');

function IngredientLoader() {}

IngredientLoader.prototype.loadToLocalStore = function() {
		this.loadCategories(require('./static/ingredients.json'));
};

IngredientLoader.prototype.loadCategories = function(categories) {
	var ingredientCategories = new IngredientCategoryList();
	
	ingredientCategories.fetch();
	if(ingredientCategories.length) {
		console.log('IngredientCategory-LocalStorage not empty.');
	}
	
	for(var categoryName in categories) {
		var categoryAttributes = {
			name: categoryName.nominalize(),
			data: this.loadIngredients(categories[categoryName], categoryName)
		};
		ingredientCategories.create(categoryAttributes);
	}
};
	
IngredientLoader.prototype.loadIngredients = function(category, categoryName) {
	var ingredientList = new IngredientList();
	for(var ingredientIndex in category) {
		var ingredientName = category[ingredientIndex].nominalize();
		var ingredientAttributes = {
			name: ingredientName,
			imageUrl: 'img/' + categoryName + '/' + category[ingredientIndex] + '.jpg'
		};
		ingredientList.create(new Ingredient(ingredientAttributes));
	}
	return ingredientList;
};

module.exports = IngredientLoader;
