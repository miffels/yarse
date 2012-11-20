'use strict';

var Ingredient = require('./Ingredient');

var KitchenIngredient = Ingredient.extend({
	typeName: 'KitchenIngredient',
	defaults: {
		imageUrl: 'img/dummy.png'
	},
	
	initialize: function() {
		this.set('id', this.get('name'));
		Ingredient.prototype.initialize.apply(this, arguments);
	}
});

module.exports = KitchenIngredient;