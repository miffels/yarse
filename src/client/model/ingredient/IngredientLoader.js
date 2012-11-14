'use strict';

var Ingredient = require('../../model/ingredient/Ingredient');
var IngredientList = require('../../model/ingredient/IngredientList');
var IngredientCategory = require('../../model/ingredient/IngredientCategory');
var IngredientCategoryList = require('../../model/ingredient/IngredientCategoryList');

function IngredientLoader() {}

IngredientLoader.prototype.loadIngredients = function(kitchen) {
		var data = this.categories(require('./ingredients.json'), kitchen);
		return data;
};
	
IngredientLoader.prototype.categories = function(categories, kitchen) {
	var ingredientCategories = new IngredientCategoryList();
	for(var key in categories) {
		ingredientCategories.add(new IngredientCategory({
			name: key.nominalize(),
			data: this.list(categories[key], key, kitchen)
		}));
	}
	return ingredientCategories;
};
	
IngredientLoader.prototype.list = function(category, name,kitchen) {
	var ingredientList = new IngredientList();
	for(var i in category) {
		ingredientList.add(new Ingredient({
			kitchen: kitchen,
			name: category[i].nominalize(),
			imageUrl: 'img/' + name + '/' + category[i] + '.jpg'
		}));
	}
	return ingredientList;
};

module.exports = IngredientLoader;
