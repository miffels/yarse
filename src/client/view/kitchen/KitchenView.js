'use strict';

var JadeView = require('../JadeView');
var Backbone = require('backbone');

var KitchenView = JadeView.extend({
	id: 'selectedIngredients',
	typeName: 'KitchenView',
	folder: 'kitchen/',
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.jadeParameters.kitchen = [];
		Backbone.Events.bind('kitchenChanged', this.onKitchenChange);
	},
	
	onKitchenChange: function(ingredients) {
		this.jadeParameters.kitchen = ingredients.models;
		this.render();
	}
});

module.exports = KitchenView;