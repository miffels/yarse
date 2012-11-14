'use strict';

/*global require:true */
require = require('enhanced-require')(module, {
	recursive: true
});

var KitchenIngredient = require('./client/model/ingredient/KitchenIngredient');
var IngredientList = require('./client/model/ingredient/KitchenIngredientList');
var IngredientCagetoryList = require('./client/model/ingredient/IngredientCategoryList');

var ingredients = new IngredientList();
var ingredientCategories = new IngredientCagetoryList();

window.localStorage.clear();

var attr1 = {
	imgageUrl: 'Some URL',
	name: 'some Name',
	kitchen: null
};

var attr2 = {
	name: 'Some Category',
	data: ingredients
};

ingredients.add(new KitchenIngredient(attr1));
ingredientCategories.create(attr2);

ingredientCategories.fetch();
ingredients = ingredientCategories.first().get('data');

console.log(ingredients.length);
console.log(ingredientCategories.length);

window.localStorage.clear();