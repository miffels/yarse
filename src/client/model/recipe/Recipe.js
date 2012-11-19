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
		kitchen: null,
		scoreWeights: {
			'viewed': 0,
			'dismissed': -3,
			'chosen': 5,
			'ignored': -2,
			'rating': 1
		}
	},
	
	initialize: function() {
		Model.prototype.initialize.apply(this, arguments);
		this.setDefaultImage();
		this.calculateKitchenOverlap();
	},
	
	setDefaultImage: function() {
		var images = this.get('images') && this.get('images').length ? this.get('images') : ['http://a.ftscrt.com/static/images/box/recipe_default.jpg'];
		this.set('images', images);
	},
	
	calculateKitchenOverlap: function() {
		var kitchenIngredientNames = [];
		var kitchen = this.get('kitchen');
		if(!kitchen) {
			this.set('ingredientsFromKitchen', new KitchenIngredientList());
			return;
		}
		kitchen.get('ingredients').each(function(ingredient) {
			kitchenIngredientNames.push(ingredient.get('name'));
		});
		this.set('ingredientsFromKitchen', kitchen.get('ingredients').filterByName(kitchenIngredientNames));
	},
	
	increaseIngredientProperty: function(property) {
		this.get('ingredients').forEach(function(ingredient) {
			ingredient.set(property, ingredient.get(property) + 1);
			ingredient.save();
		});
	},
	
	view: function() {
		this.increaseIngredientProperty('viewed');
	},
	
	dismiss: function() {
		this.increaseIngredientProperty('dismissed');
	},
	
	choose: function() {
		this.increaseIngredientProperty('chosen');
	},
	
	ignore: function() {
		this.increaseIngredientProperty('ignored');
	},
	
	score: function() {
		var rating = this.get('rating');
		var score = (rating instanceof Number ? rating : parseInt(rating, 10));
		score *= this.get('scoreWeights')['rating'];
		this.get('ingredients').forEach(function(ingredient) {
			for(var scoreWeight in this.get('scoreWeights')) {
				if(ingredient.attributes.hasOwnProperty(scoreWeight)) {
					score += this.get('scoreWeights')[scoreWeight] * ingredient.get(scoreWeight);
				}
			}
		}.bind(this));
		return score;
	}
});

module.exports = Recipe;