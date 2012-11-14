'use strict';

var Model = require('../Model');

var Ingredient = Model.extend({
	typeName: 'Ingredient',
	defaults: {
		name: null,
		imageUrl: 'img/dummy.png',
		kitchen: null
	},
	
	initialize: function() {
		Model.prototype.initialize.apply(this);
		this.id = this.attributes.name;
	}
});

module.exports = Ingredient;