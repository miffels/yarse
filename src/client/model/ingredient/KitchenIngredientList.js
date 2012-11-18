'use strict';

var KitchenIngredient = require('./KitchenIngredient');
var IngredientList = require('./IngredientList');

var KitchenIngredientList = IngredientList.extend({
	typeName: 'KitchenIngredientList',
	model: KitchenIngredient,
	
	filterByName: function(names) {
		return this.filter(function(ingredient) {
			var result = false;
			names.forEach(function(name) {
				result = result || ingredient.get('name').indexOf(name) !== -1;
			});
			return result;
		});
	}
});

module.exports = KitchenIngredientList;