'use strict';

var _ = require('underscore');
var JadeView = require('../JadeView');

var IngredientView = JadeView.extend({
	id: 'ingredient',
	typeName: 'IngredientView',
	folder: 'ingredient/',
	events: {
		'click': 'onClick'
	},
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.jadeParameters.ingredient = this.options.attributes;
		
		this.ingredient = this.options;
		this.kitchen = this.ingredient.attributes.kitchen;
		this.ingredients = this.kitchen.attributes.ingredients;
		this.id = this.ingredient.attributes.name;
	},
	
	onClick: function(event) {
		this.$('a').toggleClass('active-ingredient');
		if(this.ingredients.models.indexOf(this.ingredient) === -1) {
			this.kitchen.addIngredient(this.ingredient);
		} else {
			this.kitchen.removeIngredient(this.ingredient);
		}
	}
});

module.exports = IngredientView;