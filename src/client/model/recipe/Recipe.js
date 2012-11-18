'use strict';

var Model = require('../Model');
var KitchenIngredientList = require('../ingredient/KitchenIngredientList');

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
		types: null,
		ingredientsFromKitchen: null,
		kitchen: null
	},
	
	initialize: function() {
		Model.prototype.initialize.apply(this, arguments);
		this.setDefaultImage();
		this.calculateKitchenOverlap();
	},
	
	setDefaultImage: function() {
		var images = this.images && this.images.length ? this.images : ['http://a.ftscrt.com/static/images/box/recipe_default.jpg'];
		this.set('images', images);
	},
	
	calculateKitchenOverlap: function() {
		var kitchenIngredientNames = [];
		var kitchen = this.get('kitchen');
		if(!kitchen) {
			this.ingredientsFromKitchen = new KitchenIngredientList();
			return;
		}
		kitchen.get('ingredients').each(function(ingredient) {
			kitchenIngredientNames.push(ingredient.get('name'));
		});
		this.set('ingredientsFromKitchen', kitchen.get('ingredients').filterByName(kitchenIngredientNames));
	}
});

module.exports = Recipe;