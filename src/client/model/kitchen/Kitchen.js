'use strict';

var Model = require('../Model');
var IngredientList = require('../ingredient/KitchenIngredientList');
var Backbone = require('backbone');

var Kitchen = Model.extend({
	typeName: 'Kitchen',
	defaults: {
		ingredients: null,
		kitchenView: null
	},
	
	initialize: function() {
		this.attributes.ingredients = this.attributes.ingredients || new IngredientList();
		Model.prototype.initialize.apply(this, arguments);
		Backbone.Events.bind('ingredientClicked', this.toggleIngredient);
	},
	
	toggleIngredient: function(ingredient) {
		if(this.get('ingredients').models.indexOf(ingredient) === -1) {
			this.addIngredient(ingredient);
		} else {
			this.removeIngredient(ingredient);
		}
	},
	
	addIngredient: function(ingredient) {
		this.attributes.ingredients.add(ingredient);
		this.attributes.kitchenView.render();
	},
	
	removeIngredient: function(ingredient) {
		this.attributes.ingredients.remove(ingredient);
		this.attributes.kitchenView.render();
	}
});

module.exports = Kitchen;