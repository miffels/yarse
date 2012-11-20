'use strict';

var Model = require('../Model');
var IngredientList = require('../ingredient/KitchenIngredientList');
var Backbone = require('backbone');

var Kitchen = Model.extend({
	typeName: 'Kitchen',
	defaults: {
		ingredients: null
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
		Backbone.Events.trigger('kitchenChanged', this.get('ingredients'));
	},
	
	addIngredient: function(ingredient) {
		this.attributes.ingredients.add(ingredient);
	},
	
	removeIngredient: function(ingredient) {
		this.attributes.ingredients.remove(ingredient);
	}
});

module.exports = Kitchen;