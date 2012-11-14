'use strict';

var Model = require('../Model');
var Ingredient = require('../ingredient/Ingredient');

var Recipe = Model.extend({
	typeName: 'Recipe',
	defaults: {
		name: null,
		imageUrl: 'http://a.ftscrt.com/static/recipe/c24ef376-00c4-46b7-8add-c6a65913eece.jpg'
	},
	
	ingredientsFromKitchen: function() {
		return [new Ingredient({name: "Apples"}), new Ingredient({name: "Oranges"}), new Ingredient({name: "Beef"})];
	}
});

module.exports = Recipe;