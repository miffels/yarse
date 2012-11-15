'use strict';

var Model = require('../Model');
var Ingredient = require('../ingredient/Ingredient');

var Recipe = Model.extend({
	typeName: 'Recipe',
	defaults: {
		categories: null,
		cookingTime: null,
		description: null,
		directions: null,
		id: null,
		images: null,
		ingredients: null,
		name: null,
		numberOfServings: null,
		preparationTime: null,
		rating: null,
		types: null
	},
	
	initialize: function() {
		Model.prototype.initialize.apply(this, arguments);
		this.setDefaultImage();
	},
	
	setDefaultImage: function() {
		this.images = this.images && this.images.length ? this.images : ['http://a.ftscrt.com/static/recipe/c24ef376-00c4-46b7-8add-c6a65913eece.jpg'];
	},
	
	ingredientsFromKitchen: function() {
		return [new Ingredient({name: 'Apples'}), new Ingredient({name: 'Oranges'}), new Ingredient({name: 'Beef'})];
	}
});

module.exports = Recipe;