'use strict';

var Ingredient = require('./Ingredient');

var RecipeIngredient = Ingredient.extend({
	typeName: 'RecipeIngredient',
	defaults: {
		id: null,
		transientData: null
	},
	
	initialize: function() {
		Ingredient.prototype.initialize.apply(this);
		this.initializeTransientData();
	},
	
	initializeTransientData: function() {
		this.transientData = {};
		this.setTransient(this.get('transientData'));
		this.set({
			transientData: null
		}); // Must not be persisted according to the FatSecret license agreement
	},
	
	getTransient: function(attribute) {
		return this.transientData[attribute];
	},
	
	setTransient: function(attributes) {
		for(var attributeName in attributes) {
			this.transientData[attributeName] = attributes[attributeName];
		}
	}
});

module.exports = RecipeIngredient;