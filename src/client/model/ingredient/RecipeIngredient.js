'use strict';

var Ingredient = require('./Ingredient');

var RecipeIngredient = Ingredient.extend({
	typeName: 'RecipeIngredient',
	defaults: {
		id: null,
		viewed: 0,
		dismissed: 0,
		chosen: 0,
		ignored: 0
	},
	
	initialize: function() {
		Ingredient.prototype.initialize.apply(this);
		this.initializeTransientData();
	},
	
	initializeTransientData: function() {
		this.transientData = {};
		this.setTransient(this.get('transientData'));
		var attributes = {};
		for(var key in this.defaults) {
			attributes[key] = this.attributes[key] || this.defaults[key];
		}
		this.attributes = attributes;
		this.set({
			id: this.id
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