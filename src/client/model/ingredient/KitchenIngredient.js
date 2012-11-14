'use strict';

var Ingredient = require('./Ingredient');

var KitchenIngredient = Ingredient.extend({
	typeName: 'KitchenIngredient',
	defaults: {
		imageUrl: 'img/dummy.png'
	},
	
	initialize: function() {
		Ingredient.prototype.initialize.apply(this);
		this.id = this.attributes.name;
	}
});

module.exports = KitchenIngredient;