'use strict';

var Model = require('../Model');

var IngredientCategory = Model.extend({
	typeName: 'IngredientCategory',
	defaults: {
		name: null,
		data: null
	},
		
	initialize: function() {
		this.data = this.attributes.data;
		this.id = this.get('name');
		Model.prototype.initialize.apply(this, arguments);
	}
});

module.exports = IngredientCategory;