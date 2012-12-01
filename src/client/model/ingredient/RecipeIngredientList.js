'use strict';

var RecipeIngredient = require('./RecipeIngredient');
var IngredientList = require('./IngredientList');

var RecipeIngredientList = IngredientList.extend({
	typeName: 'RecipeIngredientList',
	model: RecipeIngredient,
	
	filterById: function(ids) {
		return this.filter(function(ingredient) {
			return ids.indexOf(ingredient.get('id')) !== -1;
		});
	},
	
	filterByName: function(names, id) {
		return this.filter(function(ingredient) {
			var result = false;
			names.forEach(function(name) {
				result = result || (ingredient.getTransient('name').indexOf(name) !== -1);
			});
			return result;
		});
	}
});

module.exports = RecipeIngredientList;