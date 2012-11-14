'use strict';

var Model = require('../Model');
var IngredientList = require('../ingredient/IngredientList');

var Kitchen = Model.extend({
	typeName: 'Kitchen',
	defaults: {
		ingredients: null,
		kitchenView: null
	},
	
	initialize: function() {
		this.attributes.ingredients = this.attributes.ingredients || new IngredientList();
		Model.prototype.initialize.apply(this, arguments);
	},
	
	addIngredient: function(ingredient) {
		console.log('adding ' + ingredient.attributes.name);
		this.attributes.ingredients.add(ingredient);
		this.attributes.kitchenView.render();
	},
	
	removeIngredient: function(ingredient) {
		console.log('removing ' + ingredient.attributes.name);
		this.attributes.ingredients.remove(ingredient);
		this.attributes.kitchenView.render();
	}
});

module.exports = Kitchen;