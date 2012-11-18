'use strict';

var Collection = require('../Collection');
var Ingredient = require('./Ingredient');

var IngredientList = Collection.extend({
	typeName: 'IngredientList',
	model: Ingredient,
	
	filter: function(iterator) {
		var ingredientList = new this.constructor();
		this.each(function(ingredient) {
			if(iterator(ingredient)) {
				ingredientList.add(ingredient);
			}
		});
		return ingredientList;
	}
});

module.exports = IngredientList;