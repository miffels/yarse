'use strict';

var Collection = require('../Collection');
var RecipeIngredient = require('./RecipeIngredient');

var RecipeIngredientList = Collection.extend({
	typeName: 'RecipeIngredientList',
	model: RecipeIngredient,
	
	filter: function(iterator) {
		var ingredientList = new RecipeIngredientList();
		this.each(function(ingredient) {
			if(iterator(ingredient)) {
				ingredientList.add(ingredient);
			}
		});
		return ingredientList;
	},
	
	filterById: function(ids) {
		return this.filter(function(ingredient) {
			return ids.indexOf(ingredient.id) !== -1;
		});
	}
});

module.exports = RecipeIngredientList;