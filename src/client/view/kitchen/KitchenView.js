'use strict';

var JadeView = require('../JadeView');

var KitchenView = JadeView.extend({
	id: 'selectedIngredients',
	typeName: 'KitchenView',
	folder: 'kitchen/',
	kitchen: null,
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.kitchen = this.options.kitchen;
		this.kitchen.attributes.kitchenView = this;
		this.jadeParameters.kitchen = this.kitchen.attributes.ingredients.models;
	},
	
	render: function() {
		JadeView.prototype.render.apply(this, arguments);
		console.log(this.jadeParameters.kitchen);
	}
});

module.exports = KitchenView;