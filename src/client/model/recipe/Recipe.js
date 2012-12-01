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
			'dismissed': -1,
			'chosen': 1,
			'ignored': 0,
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
	
	addToIngredientProperty: function(property, amount) {
		this.get('ingredients').forEach(function(ingredient) {
			ingredient.set(property, ingredient.get(property) + amount);
			ingredient.save();
		});
	},
	
	increaseIngredientProperty: function(property) {
		this.addToIngredientProperty(property, 1);
	},
	
	decreaseIngredientProperty: function(property) {
		this.addToIngredientProperty(property, -1);
	},
	
	view: function() {
		this.increaseIngredientProperty('viewed');
	},
	
	dismiss: function() {
		this.increaseIngredientProperty('dismissed');
	},
	
	revokeDismissal: function() {
		this.decreaseIngredientProperty('dismissed');
	},
	
	choose: function() {
		this.increaseIngredientProperty('chosen');
	},
	
	ignore: function() {
		this.increaseIngredientProperty('ignored');
	},
	
	score: function() {
		var score = 0;
		
		score = this.applyRatingToScore(score);
		score = this.applyIngredientsToScore(score);
		
		return score;
	},
	
	applyRatingToScore: function(score) {
		var rating = this.get('rating') || 0 * this.get('scoreWeights')['rating'];
		return score += rating instanceof Number ? rating : parseInt(rating, 10);
	},
	
	applyIngredientsToScore: function(score) {
		if(!this.get('ingredients')) {
			return score;
		}
		
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