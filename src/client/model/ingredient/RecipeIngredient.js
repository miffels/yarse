'use strict';

var Ingredient = require('./Ingredient');

var RecipeIngredient = Ingredient.extend({
	typeName: 'RecipeIngredient',
	defaults: {
		imageUrl: 'img/dummy.png',
		kitchen: null
	},
	
	initialize: function() {
		Ingredient.prototype.initialize.apply(this);
		this.id = this.attributes.id;
	}
});

module.exports = RecipeIngredient;