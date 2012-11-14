'use strict';

var Ingredient = require('./Ingredient');

var KitchenIngredient = Ingredient.extend({
	typeName: 'KitchenIngredient',
	defaults: {
		imageUrl: 'img/dummy.png',
		kitchen: null
	}
});

module.exports = KitchenIngredient;