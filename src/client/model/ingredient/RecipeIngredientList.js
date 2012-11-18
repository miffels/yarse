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
	}
});

module.exports = RecipeIngredientList;