'use strict';

var _ = require('underscore');
var JadeView = require('../JadeView');
var Backbone = require('backbone');

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
		this.id = this.ingredient.attributes.name;
	},
	
	onClick: function(event) {
		this.$('a').toggleClass('active-ingredient');
		Backbone.Events.trigger('ingredientClicked', this.ingredient);
	}
});

module.exports = IngredientView;