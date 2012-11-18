'use strict';

var Model = require('../Model');

var Ingredient = Model.extend({
	typeName: 'Ingredient',
	defaults: {
		name: null
	},
	
	initialize: function() {
		Model.prototype.initialize.apply(this);
		this.id = this.get('id');
	}
});

module.exports = Ingredient;